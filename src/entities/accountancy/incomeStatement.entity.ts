import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Mutation } from './mutation.entity';

@Entity({name: 'accountancy_income_statement'})
export class IncomeStatement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: number;

    @OneToMany(() => Mutation, mutation => mutation.incomeStatement)
    mutations: Mutation[];
}
