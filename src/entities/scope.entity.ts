import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';
import { User } from './user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Scope extends BaseEntity {
    constructor(name: string, id?: number) {
        super();
        this.id = id;
        this.name = name;
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty()
    @Column()
    public name: string;

    @ManyToMany(x => User, user => user.scopes)
    public users: User[];
}
