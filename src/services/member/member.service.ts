import { Injectable } from '@nestjs/common';
import { IMemberService } from './imember.service';
import { Member } from '../../entities/member.entity';
import { User } from 'src/entities/user.entity';
import { Membership } from 'src/entities/membership.entity';

@Injectable()
export class MemberService implements IMemberService {

    update(member: Member): Promise<Member> {
        return member.save();
    }

    create(member: Member): Promise<Member> {
        return member.save();
    }

    async readAll(skip: number, take: number): Promise<Member[]> {
        return await Member.find({ skip, take });
    }

    readOne(id: number): Promise<Member> {
        return Member.findOne({ where: { id } });
    }

    async giveMembership(user: User, startDate: Date = new Date(), endDate: Date = null) {
        if (!endDate) {
            endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }

        if (user.member == null) {
            const member: Member = new Member();
            member.user = user;
            member.memberSince = new Date();
            await member.save();
        }

        const membership: Membership = new Membership();
        membership.startDate = startDate;
        membership.endDate = endDate;
        membership.member = user.member;
        membership.save();
    }
}
