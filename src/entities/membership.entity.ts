import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Membership extends BaseEntity {

    constructor(start: Date, end: Date, id?: number) {
        super();
        this.startDate = start;
        this.endDate = end;
        this.id = id;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty({type: String, format: 'date'})
    @Column()
    public startDate: Date;

    @ApiProperty({type: String, format: 'date'})
    @Column()
    public endDate: Date;

    @ManyToOne(() => User, user => user.memberships, { onDelete: 'CASCADE' })
    public user: User;
}
