import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommissionDto {
  @ApiProperty({required: true, maxLength: 255})
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  description: string;
}
