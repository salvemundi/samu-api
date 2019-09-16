import { IUserService } from './iuser.service';
import { User } from '../../entities/user.entity';

export class UserService implements IUserService {

    readAll(skip: number, take: number): Promise<User[]> {
        return User.find({ skip, take });
    }

    readOne(id: number): Promise<User> {
        return User.findOne({ where: { id } });
    }

    create(user: User): Promise<User> {
        return user.save();
    }

    update(user: User): Promise<User> {
        return user.save();
    }
}
