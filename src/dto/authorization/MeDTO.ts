import { ApiProperty } from '@nestjs/swagger';

export class MeDTO {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    pcn: string;
}
