import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Committee extends BaseEntity {
    constructor(name: string, description: string, created: Date, id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.created = created;
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty()
    @Column({name: 'name'})
    public name: string;

    @ApiModelProperty()
    @Column({name: 'description'})
    public description: string;

    @ApiModelProperty({type: String, format: 'date'})
    @Column({name: 'created'})
    public created: Date;
}
