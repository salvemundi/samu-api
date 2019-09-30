import { BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Member } from './member.entity';
import { Scope } from './scope.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({select: false})
    public password: string;

    @ApiModelProperty()
    @Column()
    public firstName: string;

    @ApiModelProperty()
    @Column()
    public lastName: string;

    @ApiModelProperty({type: String, format: 'date'})
    @Column()
    public birthday: Date;

    @ApiModelProperty()
    @Column()
    public address: string;

    @ApiModelProperty()
    @Column()
    public postalcode: string;

    @ApiModelProperty()
    @Column()
    public city: string;

    @ApiModelProperty()
    @Column()
    public country: string;

    @ApiModelProperty()
    @Column()
    public phoneNumber: string;

    @ApiModelProperty()
    @Column()
    public email: string;

    @ApiModelProperty({type: String, format: 'date'})
    @Column()
    public registeredSince: Date;

    @ApiModelProperty()
    @Column({ nullable: true })
    public pcn: string;

    @ApiModelProperty()
    @OneToOne(type => Member)
    public member: Member;

    @ApiModelProperty({type: Scope, isArray: true})
    @ManyToMany(x => Scope, scope => scope.users)
    @JoinTable()
    public scopes: Scope[];

}
