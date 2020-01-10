import { User } from 'src/entities/user.entity';

export interface IMemberService {
    giveMembership(user: User, startDate: Date, endDate: Date): void;
    removeMembership(user: User);
}
