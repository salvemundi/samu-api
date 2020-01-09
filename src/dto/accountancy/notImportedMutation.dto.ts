import { ApiProperty } from '@nestjs/swagger';

export class NotImportedMutationDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    description: string;

    @ApiProperty({type: String, format: 'date'})
    date: Date;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    debtorIban: string;
}
