import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ImportMutationDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    incomeStatementId: number;
}
