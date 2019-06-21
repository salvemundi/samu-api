import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException } from '@nestjs/common';
import { CommissionService } from '../../service/commission/commission.service';
import { Commission } from '../../entity/Commission.entity';
import { CreateCommissionDto } from '../../../dist/dto/commission/create-commission-dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/commission/update-commission-dto';
@ApiUseTags('Commissions')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Commision is created.'})
    @ApiResponse({ status: 400, description: 'Validation errors.'})
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, body.created);
        this.commisionService.create(commission);
        return {TBD: 'TBD'};
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Commisions that match the skip and take parameters.'})
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return {TBD: 'TBD', commissions: await this.commisionService.read(skip, take)};
    }

    @Get('/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'A commission is found.'})
    @ApiResponse({ status: 404, description: 'A commision is not found with the provided id.'})
    async readOne(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(id);
        if (!commission) {
            throw new NotFoundException(`No corresponding commission exists with id: ${id}`);
        }
        return {TBD: 'TBD', commission};
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Commision is updated.'})
    @ApiResponse({ status: 400, description: 'Validation errors.'})
    async update(@Body() body: UpdateCommissionDto) {
        const commission = await this.commisionService.readOne(body.id);
        commission.created = body.created;
        commission.description = body.description;
        commission.name = body.name;
        this.commisionService.update(commission);
        return {TBD: 'TBD', updated: 'updated'};
    }
}
