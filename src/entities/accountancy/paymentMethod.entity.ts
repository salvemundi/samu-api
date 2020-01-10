import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mutation } from './mutation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'accountancy_payment_method'})
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    code: number;

    @Column({ default: 0 })
    @ApiProperty({ default: 0 })
    startAssets: number;

    @Column({ default: 0 })
    @ApiProperty({ default: 0 })
    startLiabilities: number;

    @OneToMany(() => Mutation, mutation => mutation.paymentMethod)
    mutations: Mutation[];
}
