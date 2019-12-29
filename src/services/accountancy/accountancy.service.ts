import { Injectable } from '@nestjs/common';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { AccountancyServiceInterface } from './accountancy.service.interface';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';

@Injectable()
export class AccountancyService implements AccountancyServiceInterface {
    public async readAllIncomeStatements(): Promise<IncomeStatement[]> {
        return IncomeStatement.find({relations: ['mutations']});
    }

    public async readAllPaymentMethods(): Promise<PaymentMethod[]> {
        return PaymentMethod.find({relations: ['mutations']});
    }
}
