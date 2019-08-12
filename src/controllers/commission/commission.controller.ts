import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException } from '@nestjs/common';
import { CommissionService } from 'src/services/commission/commission.service';
import { Commission } from 'src/entities/commission.entity';
import { CreateCommissionDto } from 'src/dto/commission/create-commission-dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UpdateCommissionDto } from 'src/dto/commission/update-commission-dto';

@ApiUseTags('commissions')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {}

    @Get('/:id')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is found.', type: Commission})
    @ApiResponse({status: 404, description: 'No commission was found with the provided id.'})
    async readOne(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(+id);
        if (!commission) {
            throw new NotFoundException(`No commission exists with id: ${id}.`);
        }
        return {commission};
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissions that match the skip and take parameters.', type: Array<Commission>()})
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return { commissions: await this.commisionService.read(skip, take) };
    }

    @Post()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is created.', type: Commission})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, body.created);

        return { commission: await this.commisionService.create(commission) };
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commission is updated.', type: Commission})
    @ApiResponse({status: 400, description: 'Validation errors.'})
    @ApiResponse({status: 404, description: 'No commission was found with the provided id.'})
    async update(@Body() body: UpdateCommissionDto) {
        const commission = await this.commisionService.readOne(body.id);
        if (!commission) {
            throw new NotFoundException(`No commission exists with id: ${body.id}.`);
        }

        commission.created = body.created;
        commission.description = body.description;
        commission.name = body.name;

        return { commission: await this.commisionService.update(commission) };
    }
}
