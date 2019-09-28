import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Entity } from 'typeorm';
import { Membership } from './membership.entity';
import { User } from './user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Member extends BaseEntity {

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty()
    @OneToMany(type => Membership, membership => membership.member)
    public memberships: Membership[];

    @ApiModelProperty()
    @OneToOne(type => User)
    public user: User;

    @ApiModelProperty({type: String, format: 'date'})
    @Column()
    public memberSince: Date;

}