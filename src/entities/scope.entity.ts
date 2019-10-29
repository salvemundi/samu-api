import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';
import { User } from './user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Scope extends BaseEntity {
    constructor(name: string, description: string, id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty()
    @Column()
    public name: string;

    @ApiModelProperty()
    @Column()
    public description: string;

    @ManyToMany(type => User, user => user.scopes)
    public users: User[];
}
