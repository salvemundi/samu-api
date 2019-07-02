import { Module } from '@nestjs/common';
import { CommissionController } from '../../controllers/commission/commission.controller';
import { CommissionService } from '../../services/commission/commission.service';

@Module({
    controllers: [CommissionController],
    providers: [CommissionService],
})
export class CommissionModule {}
