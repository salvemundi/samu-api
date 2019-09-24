import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Scope extends BaseEntity {
    constructor(name: string, id?: number) {
        super();
        this.id = id;
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(x => User, user => user.scopes)
    public users: User[];
}
