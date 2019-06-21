import { Controller } from '@nestjs/common';
import { CommissionService } from 'src/service/commission/commission.service';

@Controller('commission')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {
    }
}
