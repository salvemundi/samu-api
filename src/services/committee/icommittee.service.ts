import { Committee } from 'src/entities/committee.entity';

export interface ICommitteeService {
    create(model: Committee): Promise<Committee>;
    read(skip: number, take: number): Promise<Committee[]>;
    readOne(id: number): Promise<Committee>;
    update(model: Committee): Promise<Committee>;
    delete(model: Committee): Promise<Committee>;
}
