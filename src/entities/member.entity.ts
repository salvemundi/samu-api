import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Membership } from './membership.entity';
import { CreateMemberDto } from 'src/dto/member/create-member-dto';

export class Member extends BaseEntity {
    constructor(dto: CreateMemberDto) {
        super();
        this.pcn = dto.pcn;
        this.firstName = dto.firstName;
        this.middleName = dto.middleName;
        this.lastName = dto.lastName;
        this.birthday = dto.birthday;
        this.address = dto.address;
        this.postalcode = dto.postalcode;
        this.city = dto.city;
        this.country = dto.country;
        this.phoneNumber = dto.phoneNumber;
        this.email = dto.email;
        this.registeredSince = new Date();
        this.memberships = [];
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public pcn: number;

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

    @OneToMany(type => Membership, membership => membership.member)
    public memberships: Membership[];
}
