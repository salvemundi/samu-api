import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { PaymentStatus } from '../controllers/payment/paymentstatus.enum';

@Entity('transaction')
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public status: PaymentStatus;

    @Column()
    public price: number;

    @Column()
    public description: string;

    @ManyToOne(() => User, user => user.transactions,  { onDelete: 'CASCADE' })
    public user: User;
}
