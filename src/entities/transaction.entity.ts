import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { PaymentStatus } from "src/controllers/payment/paymentstatus.enum";

@Entity("transaction")
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => User)
    public user: User;

    @Column()
    public status: PaymentStatus;

    @Column()
    public amount: string;

    @Column()
    public description: string;

    @Column()
    public transaction_id: number;
}