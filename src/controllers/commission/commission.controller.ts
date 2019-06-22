import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException } from '@nestjs/common';
import { CommissionService } from '../../services/commission/commission.service';
import { Commission } from '../../entities/Commission.entity';
import { CreateCommissionDto } from '../../dto/commission/create-commission-dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/commission/update-commission-dto';

@ApiUseTags('commissions')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {}

    @Get('/:id')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is found.'})
    @ApiResponse({status: 404, description: 'No commission was found with the provided id.'})
    async readOne(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(id);
        if (!commission) {
            throw new NotFoundException(`No commission exists with id: ${id}.`);
        }
        return {TBD: 'TBD', commission};
    }
    
    @Get()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissions that match the skip and take parameters.'})
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return {TBD: 'TBD', commissions: await this.commisionService.read(skip, take)};
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({status: 201, description: 'Commission is created.'})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, body.created);
        this.commisionService.create(commission);
        return {TBD: 'TBD'};
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is updated.'})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    async update(@Body() body: UpdateCommissionDto) {
        const commission = await this.commisionService.readOne(body.id);
        commission.created = body.created;
        commission.description = body.description;
        commission.name = body.name;
        this.commisionService.update(commission);
        return {TBD: 'TBD', updated: 'updated'};
    }
}
