import { ApiProperty } from '@nestjs/swagger';

export class ActivationLinkDTO {
    @ApiProperty()
    href: string;
}
