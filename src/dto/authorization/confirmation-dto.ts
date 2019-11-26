import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmationDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsUUID('4')
    public token: string;

    @ApiModelProperty()
    @IsNotEmpty()
    public password: string;
}
