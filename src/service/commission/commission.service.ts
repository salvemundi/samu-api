import { Injectable } from '@nestjs/common';
import { Commission } from '../../entity/Commission.entity';

@Injectable()
export class CommissionService {
    public async create(model: Commission): Promise<void> {
        await Commission.save(model);
    }

    public async read(skip: number, take: number) {
        if (take > 100) {
            take = 1;
        }
        return await Commission.find({skip, take});
    }

    public async readOne(id: number) {
        return await Commission.findOne(id);
    }

    public async update(model: Commission) {
        await Commission.save(model);
    }
}
