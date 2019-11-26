import { ApiModelProperty } from '@nestjs/swagger';

class Url {
    @ApiModelProperty()
    public href: string;

    @ApiModelProperty()
    public type: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PaymentDto {
    @ApiModelProperty({required: true, type: Url})
    public url: Url;

    @ApiModelProperty({required: true, type: String, format: 'date-time'})
    public expiresAt: Date;
}
