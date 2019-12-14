import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmationDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    public token: string;

    @ApiProperty()
    @IsNotEmpty()
    public password: string;
}
