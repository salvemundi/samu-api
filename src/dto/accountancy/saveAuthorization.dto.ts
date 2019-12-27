import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveAuthorizationDTO {
    @IsNotEmpty()
    @ApiProperty()
    code: string;
}
