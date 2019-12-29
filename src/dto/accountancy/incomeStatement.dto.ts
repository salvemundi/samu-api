import { ApiProperty } from '@nestjs/swagger';

export class IncomeStatementDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({nullable: true, required: false})
    code: number;

    @ApiProperty({nullable: true, required: false})
    profit: number;

    @ApiProperty({nullable: true, required: false})
    lost: number;
}
