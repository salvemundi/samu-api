import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';
import { Mutation } from '../../entities/accountancy/mutation.entity';

export interface AccountancyServiceInterface {
    readAllIncomeStatements(till: Date): Promise<IncomeStatement[]>;
    readAllPaymentMethods(till: Date): Promise<PaymentMethod[]>;
    readAllNotImportedMutations(): Promise<Mutation[]>;
    readOneMutations(id: number): Promise<Mutation>;
    readOnePaymentMethod(id: number): Promise<PaymentMethod>;
    readOnePaymentMethodByCode(code: number): Promise<PaymentMethod>;
    deletePaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    readOneIncomeStatement(id: number): Promise<IncomeStatement>;
    readOneIncomeStatementByCode(code: number): Promise<IncomeStatement>;
    deleteIncomeStatement(incomeStatement: IncomeStatement): Promise<IncomeStatement>;
    saveMutation(mutation: Mutation): Promise<Mutation>;
    saveIncomeStatement(incomeStatement: IncomeStatement): Promise<IncomeStatement>;
    savePaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
}
