import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Entity } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column({ nullable: true })
    public middleName: string;

    @Column()
    public lastName: string;

    @Column()
    public birthday: Date;

    @Column()
    public address: string;

    @Column()
    public postalcode: string;

    @Column()
    public city: string;

    @Column()
    public country: string;

    @Column()
    public phoneNumber: string;

    @Column()
    public email: string;

    @Column()
    public registeredSince: Date;

    @OneToOne(type => Member)
    public member: Member;

    @Column({ nullable: true })
    public pcn: number;

}