import { ApiModelProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
    @ApiModelProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    firstName: string;

    @ApiModelProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    lastName: string;

    @ApiModelProperty({required: true, type: String, format: 'date'})
    @IsNotEmpty()
    birthday: Date;

    @ApiModelProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    address: string;

    @ApiModelProperty({required: true, maxLength: 64})
    @IsNotEmpty()
    @MaxLength(64)
    city: string;

    @ApiModelProperty({required: true, maxLength: 6})
    @IsNotEmpty()
    @MaxLength(6)
    postalcode: string;

    @ApiModelProperty({required: true, maxLength: 64})
    @IsNotEmpty()
    @MaxLength(64)
    country: string;

    @ApiModelProperty({required: true, type: String, format: 'email'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty({required: true, maxLength: 14})
    @IsNotEmpty()
    @MaxLength(14)
    phoneNumber: string;

    @ApiModelProperty({required: true, maxLength: 7})
    @MaxLength(7)
    pcn: string;
}
