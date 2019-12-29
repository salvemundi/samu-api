import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mutation } from './mutation.entity';

@Entity({name: 'accountancy_payment_method'})
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: number;

    @Column()
    startAssets: number;

    @OneToMany(() => Mutation, mutation => mutation.paymentMethod)
    mutations: Mutation[];
}
