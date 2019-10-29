import { BaseEntity, PrimaryGeneratedColumn, OneToMany, Entity, JoinTable } from 'typeorm';
import { Membership } from './membership.entity';
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

    @ApiModelProperty({type: Membership, isArray: true})
    @OneToMany(() => Membership, membership => membership.member)
    public memberships: Membership[];
}
