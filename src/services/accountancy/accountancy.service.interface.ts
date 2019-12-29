import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';

export interface AccountancyServiceInterface {
    readAllIncomeStatements(): Promise<IncomeStatement[]>;
}
