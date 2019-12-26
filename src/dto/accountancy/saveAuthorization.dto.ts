import { IsNotEmpty } from 'class-validator';

export class SaveAuthorizationDTO {
    @IsNotEmpty()
    code: string;
}
