import { ApiProperty } from '@nestjs/swagger';

class Url {
    @ApiProperty()
    public href: string;

    @ApiProperty()
    public type: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PaymentDTO {
    @ApiProperty({required: true, type: Url})
    public url: Url;

    @ApiProperty({required: true, type: String, format: 'date-time'})
    public expiresAt: Date;
}
