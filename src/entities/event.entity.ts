import { BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { User } from "./user.entity";
import { Committee } from "./committee.entity";

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;
    
    @Column() 
    private name: string;
    
    @Column() 
    private description: string;
    
    @Column()
    private createdBy: User;

    @Column()
    private committee: Committee;

    @Column()
    private startDate: Date;
    
    @Column()
    private endDate: Date;
    
    @Column()
    private signupBefore: Date;

    @Column()
    private memberOnly: boolean;

    @Column()
    private memberPrice: number;

    @Column()
    private notMemberPrice: number;
    
}