import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { PaymentMethod } from './paymentMethod.entity';
import { IncomeStatement } from './incomeStatement.entity';

@Entity({name: 'accountancy_mutation'})
export class Mutation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entryReference: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    debtorIban: string;

    @Column()
    imported: boolean;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.mutations,  { onDelete: 'CASCADE', nullable: true })
    paymentMethod?: PaymentMethod;

    @ManyToOne(() => IncomeStatement, incomeStatement => incomeStatement.mutations,  { onDelete: 'CASCADE', nullable: true })
    incomeStatement?: IncomeStatement;
}
