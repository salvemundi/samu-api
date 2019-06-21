import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CommissionService } from '../../service/commission/commission.service';
import { CreateCommissionDto } from '../../dto/commission/create-commission-dto';
import { Commission } from '../../entity/Commission.entity';

@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {
    }

    @Post()
    @HttpCode(201)
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, body.created);
        this.commisionService.create(commission);
        return {TBD: 'TBD'};
    }
}
