import { IsNotEmpty, Max } from 'class-validator';

export class CreateCommissionDto {
  @Max(255)
  name: string;

  @IsNotEmpty()
  description: string;

  created: Date;
}
