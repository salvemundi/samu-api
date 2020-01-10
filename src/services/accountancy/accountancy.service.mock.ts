import { AccountancyServiceInterface } from './accountancy.service.interface';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { Mutation } from '../../entities/accountancy/mutation.entity';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';

export class MockAccountancyService implements AccountancyServiceInterface {
    readOnePaymentMethodByCode(code: number): Promise<PaymentMethod> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    deletePaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    readOneIncomeStatementByCode(code: number): Promise<IncomeStatement> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    deleteIncomeStatement(incomeStatement: IncomeStatement): Promise<IncomeStatement> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    saveIncomeStatement(incomeStatement: IncomeStatement): Promise<IncomeStatement> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    savePaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
    readAllPaymentMethods(till: Date, name?: string): Promise<PaymentMethod[]> {
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
    readAllIncomeStatements(till: Date, name?: string): Promise<IncomeStatement[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}
