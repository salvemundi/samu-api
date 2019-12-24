import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Scope } from './scope.entity';

@Entity()
export class HatoesLink extends BaseEntity {
    constructor(href: string, type: typeEnum, id?: number) {
        super();
        this.id = id;
        this.href = href;
        this.type = type;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public href: string;

    @Column()
    public type: typeEnum;

    @ManyToOne(() => Scope, scope => scope.hatoesLinks, { onDelete: 'CASCADE' })
    public scope: Scope;
}

export enum typeEnum {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE',
}
