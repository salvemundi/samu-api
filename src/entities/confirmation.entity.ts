import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Confirmation extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public token: string;

    @OneToOne(type => User)
    public user: User;
}
