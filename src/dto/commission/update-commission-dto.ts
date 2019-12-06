import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommissionDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  id: number;

  @ApiProperty({required: true, maxLength: 255})
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  description: string;
}
