import { Injectable } from '@nestjs/common';
import { IncomeStatement } from '../../entities/accountancy/incomeStatement.entity';

@Injectable()
export class AccountancyService {
    public async readAllIncomeStatements(): Promise<IncomeStatement[]> {
        return IncomeStatement.find({relations: ['mutations']});
    }
}
