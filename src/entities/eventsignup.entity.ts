import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class EventSignup extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public user: User;

    @Column()
    public event: Event;

    @Column({ nullable: true })
    public transaction?: Transaction;

    @Column({ default: false })
    public cancelled: boolean;

}