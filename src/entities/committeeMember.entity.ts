import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Committee } from "./committee.entity";

@Entity()
export default class CommitteeMember extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => User)
    public user: User;

    @Column()
    public profile: string;

    @Column()
    public description: string;

    @ManyToOne(type => Committee)
    public committee: Committee;

}