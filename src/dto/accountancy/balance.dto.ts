import { ApiProperty } from '@nestjs/swagger';

export class BalanceDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    balance: number;
}
