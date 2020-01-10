import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMutationDTO {
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @ApiProperty({required: false})
    entryReference: number;

    @IsNotEmpty()
    @ApiProperty({type: String, format: 'date'})
    date: Date;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;

    @IsNotEmpty()
    @ApiProperty()
    debtorIban: string;

    @IsNotEmpty()
    @ApiProperty()
    paymentMethodId: number;

    @IsNotEmpty()
    @ApiProperty()
    incomeStatementId: number;
}
