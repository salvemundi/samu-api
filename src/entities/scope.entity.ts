import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Scope extends BaseEntity {
    constructor(name: string, description: string, id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public description: string;

    @ManyToMany(() => User, user => user.scopes, { onDelete: 'CASCADE' })
    public users: User[];
}
