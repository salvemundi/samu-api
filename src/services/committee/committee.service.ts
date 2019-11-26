import { Injectable } from '@nestjs/common';
import { Committee } from '../../entities/committee.entity';
import { ICommitteeService } from './icommittee.service';
import { User } from 'src/entities/user.entity';
import CommitteeMember from 'src/entities/committeeMember.entity';

@Injectable()
export class CommitteeService implements ICommitteeService {
    public create(model: Committee): Promise<Committee> {
        return Committee.save(model);
    }

    public read(skip: number, take: number): Promise<Committee[]> {
        if (take > 100) {
            take = 1;
        }
        return Committee.find({ skip, take });
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

    public getCommitteeByName(name: string): Promise<Committee> {
        return Committee.findOne({ where: { name } });
    }

    public async addMember(committee: Committee, user: User): Promise<void> {
        let member = new CommitteeMember();
        member.user = user;
        member.committee = committee;
        await member.save();
    }
}
