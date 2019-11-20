import { BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./user.entity";
import { Committee } from "./committee.entity";
import { EventSignup } from "./eventsignup.entity";

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @ManyToOne(type => User)
    public createdBy: User;

    @ManyToOne(type => Committee)
    public committee: Committee;

    @Column()
    public startDate: Date;

    @Column()
    public endDate: Date;

    @Column()
    public signupBefore: Date;

    @Column()
    public memberOnly: boolean;

    @Column()
    public memberPrice: number;

    @Column()
    public notMemberPrice: number;

    @ManyToMany(type => EventSignup, eventSignup => eventSignup.user)
    public eventSignUps: EventSignup[];

}