import { AccountancyServiceInterface } from './accountancy.service.interface';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { Mutation } from '../../entities/accountancy/mutation.entity';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';

export class MockAccountancyService implements AccountancyServiceInterface {
    readAllPaymentMethods(till: Date): Promise<PaymentMethod[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
    readAllNotImportedMutations(): Promise<Mutation[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
    readOneMutations(id: number): Promise<Mutation> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    readOnePaymentMethod(id: number): Promise<PaymentMethod> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    readOneIncomeStatement(id: number): Promise<IncomeStatement> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    saveMutation(mutation: Mutation): Promise<Mutation> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    readAllIncomeStatements(till: Date): Promise<IncomeStatement[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}
