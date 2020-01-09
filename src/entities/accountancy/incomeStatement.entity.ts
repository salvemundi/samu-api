import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Mutation } from './mutation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'accountancy_income_statement'})
export class IncomeStatement extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    code: number;

    @OneToMany(() => Mutation, mutation => mutation.incomeStatement)
    mutations: Mutation[];
}
