import { IUserService } from './iuser.service';
import { User } from '../../entities/user.entity';

export const USER_RELATIONS = ['scopes', 'memberships'];

export class UserService implements IUserService {
    readAll(skip: number, take: number): Promise<User[]> {
        return User.find({ skip, take, relations: USER_RELATIONS });
    }

    readOne(user: number, email?: string): Promise<User> {
        const whereQuery = { id: user };
        if (email) {
            // tslint:disable-next-line: no-string-literal
            whereQuery['email'] = email;
        }

        return User.findOne({ where: whereQuery, relations: USER_RELATIONS });
    }

    async create(user: User): Promise<User> {
        return user.save();
    }

    async update(user: User): Promise<User> {
        return user.save();
    }

    async delete(user: User): Promise<User> {
        return user.remove();
    }

    async exists(email: string): Promise<boolean> {
        return (await User.count({where: { email }})) > 0;
    }
}
