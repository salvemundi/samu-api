import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Entity } from 'typeorm';
import { Membership } from './membership.entity';
import { User } from './user.entity';

@Entity()
export class Member extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => Membership, membership => membership.member)
    public memberships: Membership[];

    @OneToOne(type => User)
    public user: User;

    @Column()
    public memberSince: Date;

}