import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {

    @ApiModelProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @ApiModelProperty({required: true, maxLength: 64})
    @IsNotEmpty()
    @MaxLength(64)
    password: string;
}
