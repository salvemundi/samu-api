import { IUserService } from './iuser.service';
import { User } from '../../entities/user.entity';

export class UserService implements IUserService {
    readAll(skip: number, take: number): Promise<User[]> {
        return User.find({ skip, take });
    }

    readOne(user: number, email?: string): Promise<User> {
        const whereQuery = { id: user, email: null };
        if (email) {
            whereQuery.email = email;
        }

        return User.findOne({ where: whereQuery, relations: ['scopes'] });
    }

    async create(user: User): Promise<User> {
        return user.save();
    }

    async update(user: User): Promise<User> {
        return user.save();
    }

    async exists(email: string): Promise<boolean> {
        return (await User.count({where: { email }})) > 0;
    }
}
