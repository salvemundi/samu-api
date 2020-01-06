import { Injectable } from '@nestjs/common';
import { IMemberService } from './imember.service';
import { User } from '../../entities/user.entity';
import { Membership } from '../../entities/membership.entity';

@Injectable()
export class MemberService implements IMemberService {

    async giveMembership(user: User, startDate: Date = new Date(), endDate: Date = null) {
        if (!endDate) {
            endDate = new Date(new Date().setFullYear(startDate.getFullYear() + 1));
        }

        const membership: Membership = new Membership(startDate, endDate);
        membership.user = user;
        await membership.save();
    }

    async removeMembership(user: User) {
        const memberships: Membership[] = user.memberships;
        const activeMembership = memberships.find(x => x.startDate >= new Date() && x.endDate <= new Date());

        if (activeMembership) {
            await activeMembership.remove();
        }
    }
}
