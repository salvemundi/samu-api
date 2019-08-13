import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
    @IsNotEmpty()
    public pcn: number;

    @IsNotEmpty()
    public firstName: string;

    public middleName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    public birthday: Date;

    @IsNotEmpty()
    public address: string;

    @IsNotEmpty()
    public postalcode: string;

    @IsNotEmpty()
    public city: string;

    @IsNotEmpty()
    public country: string;

    @IsNotEmpty()
    public phoneNumber: string;

    @IsNotEmpty()
    public email: string;
}
