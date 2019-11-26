import { Injectable } from '@nestjs/common';
import { IMemberService } from './imember.service';
import { Member } from '../../entities/member.entity';
import { User } from '../../entities/user.entity';
import { Membership } from '../../entities/membership.entity';

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
            endDate = new Date(new Date().setFullYear(startDate.getFullYear() + 1));
        }

        if (user.member == null) {
            user.member = await new Member().save();
            await user.save();
        }

        const membership: Membership = new Membership(startDate, endDate);
        membership.member = user.member;
        membership.save();

        user.member.memberships.push(membership);
    }

    async removeMembership(user: User) {
        const memberships: Membership[] = user.member.memberships;
        const activeMembership = memberships.find(x => x.startDate >= new Date() && x.endDate <= new Date());

        if (activeMembership) {
            await activeMembership.remove();
        }
    }
}
