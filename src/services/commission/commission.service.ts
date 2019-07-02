import { Injectable } from '@nestjs/common';
import { Commission } from '../../entities/Commission.entity';

@Injectable()
export class CommissionService {
    public async create(model: Commission): Promise<void> {
        await Commission.save(model);
    }

    public async read(skip: number, take: number): Promise<Commission[]> {
        if (take > 100) {
            take = 1;
        }
        return await Commission.find({skip, take});
    }

    public async readOne(id: number): Promise<Commission> {
        return await Commission.findOne(id);
    }

    public async update(model: Commission): Promise<void> {
        await Commission.save(model);
    }
}
