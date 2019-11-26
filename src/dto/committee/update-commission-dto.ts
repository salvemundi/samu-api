import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommissionDto {
  @ApiModelProperty({required: true})
  @IsNotEmpty()
  id: number;

  @ApiModelProperty({required: true, maxLength: 255})
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  description: string;
}
