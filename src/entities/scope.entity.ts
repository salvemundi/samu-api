import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Scope extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(x => User, user => user.scopes)
    public users: User[];
}
