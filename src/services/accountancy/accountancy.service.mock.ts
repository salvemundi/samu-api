import { AccountancyServiceInterface } from './accountancy.service.interface';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';

export class MockAccountancyService implements AccountancyServiceInterface {
    readAllIncomeStatements(): Promise<IncomeStatement[]> {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}

