import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class Commission extends BaseEntity {

    constructor(name?: string, description?: string, created?: Date) {
        super();
        this.name = name;
        this.description = description;
        this.created = created;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'created'})
    created: Date;
}
