import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Confirmation extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public token: string;

    @ManyToOne(() => User, user => user.confirmations, {onDelete: 'CASCADE'})
    public user: User;
}
