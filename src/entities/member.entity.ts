import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Membership } from './membership.entity';
import { User } from './user.entity';

export class Member extends BaseEntity {
    constructor() { super(); }

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => Membership, membership => membership.member)
    public memberships: Membership[];

    @OneToOne(type => User)
    public user: User;

    @Column()
    public memberSince: Date;

}