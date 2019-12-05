import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Membership extends BaseEntity {

    constructor(start: Date, end: Date, id?: number) {
        super();
        this.startDate = start;
        this.endDate = end;
        this.id = id;
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty({type: String, format: 'date'})
    @Column()
    public startDate: Date;

    @ApiModelProperty({type: String, format: 'date'})
    @Column()
    public endDate: Date;

    @ManyToOne(() => User, user => user.memberships)
    public user: User;
}
