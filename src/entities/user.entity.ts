import { BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Member } from './member.entity';
import { Scope } from './scope.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({select: false})
    public password: string;

    @Column()
    public firstName: string;

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

    @Column({ nullable: true })
    public pcn: string;

    @OneToOne(type => Member)
    public member: Member;

    @ManyToMany(x => Scope, scope => scope.users)
    @JoinTable()
    public scopes: Scope[];

}
