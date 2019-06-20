import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Test extends BaseEntity {
    @PrimaryGeneratedColumn()
    public test: number;

    @Column()
    public test2: string;
}
