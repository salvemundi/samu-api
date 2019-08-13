import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class Commission extends BaseEntity {
    constructor(name: string, description: string, created: Date, id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.created = created;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'name'})
    public name: string;

    @Column({name: 'description'})
    public description: string;

    @Column({name: 'created'})
    public created: Date;
}
