import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { FileService } from '../services/file/file.service';
import axios from 'axios';
import * as shajs from 'sha.js';
import * as nodeRSA from 'node-rsa';
import * as https from 'https';
import * as fs from 'fs';
import * as uuid from 'uuid/v4';
import { TransactionDTO } from '../dto/accountancy/transaction.dto';
import { Mutation } from '../entities/accountancy/mutation.entity';

@Injectable()
export class AccountancyJop extends NestSchedule {

    constructor(
        private fileService: FileService,
    ) {
        super();
        this.ensureAccountancyFilesExists();
    }

  @Cron('45 * * * * *')
  async handleCron() {
      const accessToken = this.fileService.getAccessTokenAccountancy();
      if (accessToken === '') {
          return;
      }

      const transactions = await AccountancyJop.obtainTransactions(this.fileService.getAccessTokenAccountancy(), this.fileService.getResourceIdAccountancy());
      for (const transaction of transactions.transactions.booked) {
        // Only add a transaction if there is not a mutation of it
        if (!!(await Mutation.findOne({where: { entryReference: transaction.entryReference}}))) {
            continue;
        }

        const mutation = new Mutation();
        mutation.entryReference = transaction.entryReference;
        mutation.amount = transaction.transactionAmount.amount;
        mutation.debtorIban = transaction.debtorAccount.iban;
        mutation.date = transaction.raboBookingDateTime;
        mutation.description = transaction.initiatingPartyName + ' ' + transaction.remittanceInformationUnstructured;

        // TODO: Need to develop an automated way of importing transactions
        mutation.imported = false;
        mutation.incomeStatement = null;
        mutation.paymentMethod = null;

        mutation.save();
      }
  }

  public static async obtainTransactions(accessToken: string, resourceId: string): Promise<TransactionDTO> {
      try {
        const response = (await axios.get(`${process.env.RABOBANK_URL}/payments/account-information/ais/v3/accounts/${resourceId}/transactions?bookingStatus=booked`,
            { headers: AccountancyJop.getHttpsHeader(accessToken),
            httpsAgent: AccountancyJop.getAccountancyHttpAgent(),
        })).data;

        return response;
      } catch (e) {
          // TODO: catch whether the accesstoken is expired
      }
  }

  public static generateDigest(body: string): string {
    return 'sha-512=' + shajs('sha512').update(body).digest('base64');
  }

  public static generateSignature(signatureString: string, headers: string): string {
    const key = new nodeRSA(this.getPrivateKey(), 'pkcs8', {signingScheme: 'pkcs1-sha512'});

    const signedSignature = key.sign(Buffer.from(signatureString), 'base64');
    return 'keyId="' + process.env.RABOBANK_CERTIFICATE_KEY_ID + '",algorithm="rsa-sha512",headers="' + headers + '",signature="' + signedSignature + '"';
  }

  public static getAccountancyHttpAgent(): https.Agent {
      return new https.Agent({
        rejectUnauthorized: false,
        cert: this.getCertificate(),
        key: this.getPrivateKey(),
      });
  }

  public static getHttpsHeader(accessToken: string) {
    const currentDate = (new Date()).toUTCString();
    const digest = AccountancyJop.generateDigest('');
    const requestId = uuid();
    const signingString = 'date: ' + currentDate + '\ndigest: ' + digest + '\nx-request-id: ' + requestId;
    const signature = AccountancyJop.generateSignature(signingString, 'date digest x-request-id');

    return {
        'Authorization': 'Bearer ' + accessToken,
        'date': currentDate,
        'x-request-id': requestId,
        'digest': digest,
        'signature': signature,
        'tpp-signature-certificate': this.getCertificate().toString('utf8').replace(/\r?\n|\r/g, '').substr(27, 1224),
        'x-ibm-client-id': process.env.RABOBANK_CLIENT_ID,
    };
  }

  private static getCertificate(): Buffer {
      return fs.readFileSync(process.env.RABOBANK_CERTIFICATE_PATH);
  }

  private static getPrivateKey(): Buffer {
      return fs.readFileSync(process.env.RABOBANK_PRIVATE_KEY_PATH);
  }

  private ensureAccountancyFilesExists() {
    try {
        this.fileService.getAccessTokenAccountancy();
    } catch (e) {
        this.fileService.saveAccessTokenAccountancy('');
    }

    try {
        this.fileService.getRefreshTokenAccountancy();
    } catch (e) {
        this.fileService.saveRefreshTokenAccountancy('');
    }

    try {
        this.fileService.getResourceIdAccountancy();
    } catch (e) {
        this.fileService.saveResourceIdAccountancy('');
    }
  }
}
