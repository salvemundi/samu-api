import { Injectable } from '@nestjs/common';
import { Commission } from '../../entity/Commission.entity';

@Injectable()
export class CommissionService {
    public async create(dto: Commission): Promise<void> {
        await Commission.save(dto);
    }
}
