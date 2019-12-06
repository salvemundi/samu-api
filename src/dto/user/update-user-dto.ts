import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    public id: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    public pcn: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public firstName: string;

    @ApiProperty({required: false, maxLength: 255})
    public middleName: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public lastName: string;

    @ApiProperty({required: true, type: String, format: 'date'})
    @IsNotEmpty()
    public birthday: Date;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public address: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public postalcode: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public city: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public country: string;

    @ApiProperty({required: true, maxLength: 10})
    @IsNotEmpty()
    public phoneNumber: string;

    @ApiProperty({required: true, maxLength: 255})
    @IsNotEmpty()
    public email: string;
}
