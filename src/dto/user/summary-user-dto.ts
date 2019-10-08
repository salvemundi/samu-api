import { ApiModelProperty } from '@nestjs/swagger';

export class SummaryUserDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    pcn: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty({type: String, format: 'date'})
    memberTill: Date;
}
