import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { HatoesLink } from './hateosLink.entity';

@Entity()
export class Scope extends BaseEntity {
    constructor(name: string, description: string, id?: number, links?: HatoesLink[]) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.hatoesLinks = links;
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

    @OneToMany(() => HatoesLink, link => link.scope)
    public hatoesLinks: HatoesLink[];
}
