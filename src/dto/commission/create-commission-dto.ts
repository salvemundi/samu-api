import { IsNotEmpty, Max, IsDate } from 'class-validator';

export class CreateCommissionDto {
  @Max(255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDate()
  created: Date;
}
