import { Injectable } from '@nestjs/common';
import { Committee } from '../../entities/committee.entity';
import { ICommitteeService } from './icommittee.service';

@Injectable()
export class CommitteeService implements ICommitteeService {
    public create(model: Committee): Promise<Committee> {
        return Committee.save(model);
    }

    public read(skip: number, take: number): Promise<Committee[]> {
        if (take > 100) {
            take = 1;
        }
        return Committee.find({skip, take});
    }

    public readOne(id: number): Promise<Committee> {
        return Committee.findOne(id);
    }

    public update(model: Committee): Promise<Committee> {
        return Committee.save(model);
    }

    public delete(model: Committee): Promise<Committee> {
        return Committee.remove(model);
    }
}
