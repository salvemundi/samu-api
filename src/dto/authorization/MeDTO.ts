import { ApiModelProperty } from '@nestjs/swagger';

export class MeDTO {
    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    pcn: string;
}
