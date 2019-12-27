import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'accountancy_mutation'})
export class Mutation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
