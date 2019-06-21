import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CommissionService } from '../../service/commission/commission.service';
import { Commission } from '../../entity/Commission.entity';
import { CreateCommissionDto } from '../../../dist/dto/commission/create-commission-dto';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('Commissions')
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
