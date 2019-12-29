import { Injectable } from '@nestjs/common';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { AccountancyServiceInterface } from './accountancy.service.interface';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';
import { Mutation } from '../../entities/accountancy/mutation.entity';

@Injectable()
export class AccountancyService implements AccountancyServiceInterface {
    public async readAllIncomeStatements(): Promise<IncomeStatement[]> {
        return IncomeStatement.find({relations: ['mutations']});
    }

    public async readAllPaymentMethods(): Promise<PaymentMethod[]> {
        return PaymentMethod.find({relations: ['mutations']});
    }

    public async readAllNotImportedMutations(): Promise<Mutation[]> {
        return Mutation.find({ where: { imported: false }});
    }

    public async readOneMutations(id: number): Promise<Mutation> {
        return Mutation.findOne({ where: { id }, relations: ['paymentMethod', 'incomeStatement']});
    }

    public async readOnePaymentMethod(id: number): Promise<PaymentMethod> {
        return PaymentMethod.findOne( {where: { id }});
    }

    public async readOneIncomeStatement(id: number): Promise<IncomeStatement> {
        return IncomeStatement.findOne( {where: { id }});
    }

    public async saveMutation(mutation: Mutation) {
        mutation.save();
    }
}
