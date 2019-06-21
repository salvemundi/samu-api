import { IsNotEmpty, Max, IsDate, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCommissionDto {
  @ApiModelProperty({required: true, maxLength: 255})
  @MaxLength(255)
  name: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  description: string;

  @ApiModelProperty({required: true, format: 'datetime'})
  @IsNotEmpty()
  created: Date;
}
