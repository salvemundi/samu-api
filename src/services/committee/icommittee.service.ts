import { Committee } from 'src/entities/committee.entity';
import { User } from 'src/entities/user.entity';

export interface ICommitteeService {
    create(model: Committee): Promise<Committee>;
    read(skip: number, take: number): Promise<Committee[]>;
    readOne(id: number): Promise<Committee>;
    update(model: Committee): Promise<Committee>;
    delete(model: Committee): Promise<Committee>;

    getCommitteeByName(name: string): Promise<Committee>;
    addMember(committee: Committee, user: User): any;
}
