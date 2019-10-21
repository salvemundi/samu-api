import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { PaymentStatus } from '../controllers/payment/paymentstatus.enum';

@Entity('transaction')
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.transactions)
    public user: User;

    @Column()
    public status: PaymentStatus;

    @Column()
    public price: number;

    @Column()
    public description: string;

    @Column({name: 'transaction_id'})
    public transactionId: number;
}
