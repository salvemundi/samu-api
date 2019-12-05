import { BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Scope } from './scope.entity';
import { Transaction } from '../entities/transaction.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Confirmation } from './confirmation.entity';
import { Membership } from './membership.entity';

@Entity()
export class User extends BaseEntity {

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({select: false, nullable: true})
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
    @Column()
    public activated: boolean;

    @ApiModelProperty({type: Membership, isArray: true})
    @OneToMany(() => Membership, membership => membership.user)
    public memberships: Membership[];

    @ApiModelProperty({type: Scope, isArray: true})
    @ManyToMany(() => Scope, scope => scope.users)
    @JoinTable()
    public scopes: Scope[];

    @OneToMany(() => Transaction, transaction => transaction.user)
    public transactions: Transaction[];

    @OneToMany(() => Confirmation, c => c.user)
    public confirmations: Confirmation[];
}
