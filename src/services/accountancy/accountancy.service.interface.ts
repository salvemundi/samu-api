import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { PaymentMethod } from '../../entities/accountancy/paymentMethod.entity';
import { Mutation } from '../../entities/accountancy/mutation.entity';

export interface AccountancyServiceInterface {
    readAllIncomeStatements(till: Date): Promise<IncomeStatement[]>;
    readAllPaymentMethods(till: Date): Promise<PaymentMethod[]>;
    readAllNotImportedMutations(): Promise<Mutation[]>;
    readOneMutations(id: number): Promise<Mutation>;
    readOnePaymentMethod(id: number): Promise<PaymentMethod>;
    readOneIncomeStatement(id: number): Promise<IncomeStatement>;
    saveMutation(mutation: Mutation): Promise<Mutation>;
}
