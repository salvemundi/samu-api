import { BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { User } from "./user.entity";
import { Committee } from "./committee.entity";

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column() 
    public title: string;
    
    @Column() 
    public description: string;
    
    @Column()
    public createdBy: User;

    @Column()
    public committee: Committee;

    @Column()
    public startDate: Date;
    
    @Column()
    public endDate: Date;
    
    @Column()
    public signupBefore: Date;

    @Column()
    public memberOnly: boolean;

    @Column()
    public memberPrice: number;

    @Column()
    public notMemberPrice: number;
    
}