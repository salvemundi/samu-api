import { Injectable } from '@nestjs/common';
import { IMemberService } from './imember.service';
import { Member } from 'src/entities/member.entity';

@Injectable()
export class MemberService implements IMemberService {
    update(member: Member): Promise<Member> {
        return member.save();
    }
    create(member: Member): Promise<Member> {
        return member.save();
    }
    async readAll(skip: number, take: number): Promise<Member[]> {
        return await Member.find({skip, take});
    }
    readOne(id: number): Promise<Member> {
        return Member.findOne({ where: { id } });
    }
}
