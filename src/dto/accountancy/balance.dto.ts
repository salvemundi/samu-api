import { ApiProperty } from '@nestjs/swagger';

export class BalanceDTO {
    @ApiProperty()
    id: number;

    @ApiProperty({required: false})
    code: number;

    @ApiProperty()
    name: string;

    @ApiProperty({required: false})
    liabilities: number;

    @ApiProperty({required: false})
    assets: number;

    @ApiProperty()
    startAssets: number;

    @ApiProperty()
    startLiabilities: number;
}
