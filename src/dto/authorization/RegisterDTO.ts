import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDTO {
    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    firstName: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    lastName: string;

    @ApiProperty({required: true, type: String, format: 'date'})
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    @MaxLength(255)
    address: string;

    @ApiProperty({required: true, maxLength: 64})
    @IsNotEmpty()
    @MaxLength(64)
    city: string;

    @ApiProperty({required: true, maxLength: 6})
    @IsNotEmpty()
    @MaxLength(6)
    postalcode: string;

    @ApiProperty({required: true, maxLength: 64})
    @IsNotEmpty()
    @MaxLength(64)
    country: string;

    @ApiProperty({required: true, type: String, format: 'email'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({required: true, maxLength: 14})
    @IsNotEmpty()
    @MaxLength(14)
    phoneNumber: string;

    @ApiProperty({required: true, maxLength: 7})
    @MaxLength(7)
    pcn: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    profilePicture: any;
}
