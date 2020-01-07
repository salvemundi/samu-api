import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBalanceDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    code: number;

    @IsNotEmpty()
    @ApiProperty()
    startAssets: number;

    @IsNotEmpty()
    @ApiProperty()
    startLiabilities: number;
}
