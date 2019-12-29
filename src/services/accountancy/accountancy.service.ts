import { Injectable } from '@nestjs/common';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';
import { AccountancyServiceInterface } from './accountancy.service.interface';

@Injectable()
export class AccountancyService implements AccountancyServiceInterface {
    public async readAllIncomeStatements(): Promise<IncomeStatement[]> {
        return IncomeStatement.find({relations: ['mutations']});
    }
}
