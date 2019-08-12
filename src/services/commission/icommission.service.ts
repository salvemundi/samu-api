import { Commission } from 'src/entities/Commission.entity';

export interface ICommissionService {
    create(model: Commission): Promise<Commission>;
    read(skip: number, take: number): Promise<Commission[]>;
    readOne(id: number): Promise<Commission>;
    update(model: Commission): Promise<Commission>;
}
