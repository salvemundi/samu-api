import { User } from '../../entities/user.entity';

export interface IUserService {
    readAll(skip: number, take: number): Promise<User[]>;
    readOne(id: number | string): Promise<User>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(user: User): Promise<User>;

    exists(email: string): Promise<boolean>;
}
