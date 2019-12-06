import { ApiProperty } from '@nestjs/swagger';

export class SummaryUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    pcn: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({type: String, format: 'date'})
    memberTill: Date;
}
