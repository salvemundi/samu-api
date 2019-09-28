import { Injectable } from '@nestjs/common';
import { Commission } from '../../entities/commission.entity';
import { ICommissionService } from './icommission.service';

@Injectable()
export class CommissionService implements ICommissionService {
    public create(model: Commission): Promise<Commission> {
        return Commission.save(model);
    }

    public read(skip: number, take: number): Promise<Commission[]> {
        if (take > 100) {
            take = 1;
        }
        return Commission.find({skip, take});
    }

    public readOne(id: number): Promise<Commission> {
        return Commission.findOne(id);
    }

    public update(model: Commission): Promise<Commission> {
        return Commission.save(model);
    }

    public delete(model: Commission): Promise<Commission> {
        return Commission.remove(model);
    }
}
