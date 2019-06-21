import { IsNotEmpty, Max, IsDate, MaxLength } from 'class-validator';

export class CreateCommissionDto {
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  created: Date;
}
