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

@Injectable()
export class AccountancyJop extends NestSchedule {

    constructor(
        private fileService: FileService,
    ) {
        super();
        this.ensureTokenFilesExists();
    }

  @Cron('45 * * * * *')
  async handleCron() {
      const accessToken = this.fileService.getAccessTokenAccountancy();
      if (accessToken === '') {
          return;
      }

      const response: TransactionDTO = (await axios.get(process.env.RABOBANK_URL + '/payments/account-information/ais/v3/accounts/' + this.fileService.getResourceIdAccountancy() + '/transactions?bookingStatus=booked',
                                        { headers: AccountancyJop.getHttpsHeader(this.fileService.getAccessTokenAccountancy()),
                                        httpsAgent: AccountancyJop.getAccountancyHttpAgent(),
                                    })).data;

      for (const mutation of response.transactions.booked) {

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

  private ensureTokenFilesExists() {
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
