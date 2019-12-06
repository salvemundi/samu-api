import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class EventSignup extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User)
    public user: User;

    @ManyToOne(type => Event)
    public event: Event;

    @ManyToOne(type => Transaction, {nullable: true})
    public transaction?: Transaction;

    @Column({ default: false })
    public cancelled: boolean;

}