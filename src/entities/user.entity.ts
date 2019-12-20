import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Scope } from './scope.entity';
import { Transaction } from '../entities/transaction.entity';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Confirmation } from './confirmation.entity';
import { Membership } from './membership.entity';

@Entity()
export class User extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ select: false, nullable: true })
    public password: string;

    @ApiProperty()
    @Column()
    public firstName: string;

    @ApiProperty()
    @Column()
    public lastName: string;

    @ApiProperty({ type: String, format: 'date' })
    @Column()
    public birthday: Date;

    @ApiProperty()
    @Column()
    public address: string;

    @ApiProperty()
    @Column()
    public postalcode: string;

    @ApiProperty()
    @Column()
    public city: string;

    @ApiProperty()
    @Column()
    public country: string;

    @ApiProperty()
    @Column()
    public phoneNumber: string;

    @ApiProperty()
    @Column({ unique: true })
    public email: string;

    @ApiProperty({ type: String, format: 'date' })
    @Column()
    public registeredSince: Date;

    @ApiProperty()
    @Column({ nullable: true })
    public pcn: string;

    @ApiProperty()
    @Column()
    public profilePicture: string;

    @ApiProperty()
    @Column()
    public activated: boolean;

    @ApiProperty({ type: 'array', items: { $ref: getSchemaPath('Membership') } })
    @OneToMany(() => Membership, membership => membership.user)
    public memberships: Membership[];

    @ManyToMany(() => Scope, scope => scope.users)
    @JoinTable()
    public scopes: Scope[];

    @ApiProperty({isArray: true, type: Transaction})
    @OneToMany(() => Transaction, transaction => transaction.user)
    public transactions: Transaction[];

    @OneToMany(() => Confirmation, c => c.user)
    public confirmations: Confirmation[];
}
