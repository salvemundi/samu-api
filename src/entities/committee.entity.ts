import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Committee extends BaseEntity {
    constructor(name: string, description: string, created: Date, id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.created = created;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({name: 'name'})
    public name: string;

    @ApiProperty()
    @Column({name: 'description'})
    public description: string;

    @ApiProperty({type: String, format: 'date'})
    @Column({name: 'created'})
    public created: Date;
}
