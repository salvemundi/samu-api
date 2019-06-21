import { Controller, Post, Body, HttpCode, Get, Query, Param, Put } from '@nestjs/common';
import { CommissionService } from '../../service/commission/commission.service';
import { Commission } from '../../entity/Commission.entity';
import { CreateCommissionDto } from '../../../dist/dto/commission/create-commission-dto';
import { ApiUseTags } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/commission/update-commission-dto';
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

    @Get()
    @HttpCode(200)
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return {TBD: 'TBD', commissions: await this.commisionService.read(skip, take)};
    }

    @Get('/:id')
    @HttpCode(200)
    async readOne(@Param('id') id: number) {
        return {TBD: 'TBD', commission: await this.commisionService.readOne(id)};
    }

    @Put()
    @HttpCode(200)
    async update(@Body() body: UpdateCommissionDto) {
        const commission = await this.commisionService.readOne(body.id);
        commission.created = body.created;
        commission.description = body.description;
        commission.name = body.name;
        this.commisionService.update(commission);
        return {TBD: 'TBD', updated: 'updated'};
    }
}
