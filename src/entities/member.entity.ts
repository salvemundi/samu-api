import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Entity } from 'typeorm';
import { Membership } from './membership.entity';
import { User } from './user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Member extends BaseEntity {

    constructor(id?: number, memberships?: Membership[]) {
        super();
        this.id = id;
        this.memberships = memberships;
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty()
    @OneToMany(type => Membership, membership => membership.member)
    public memberships: Membership[];
}
