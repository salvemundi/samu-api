import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException } from '@nestjs/common';
import { CommissionService } from '../../services/commission/commission.service';
import { Commission } from '../../entities/commission.entity';
import { CreateCommissionDto } from '../../dto/commission/create-commission-dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/commission/update-commission-dto';
import { Auth } from '../../decorators/auth.decorator';

@ApiUseTags('commissions')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {}

    @Get('/:id')
    @Auth('commission:read')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissie is gevonden', type: Commission})
    @ApiResponse({status: 404, description: 'Geen commissie gevonden...'})
    async readOne(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(+id);
        if (!commission) {
            throw new NotFoundException(`Geen commissie met id: ${id}.`);
        }
        return {commission};
    }

    @Get()
    @Auth('commission:read')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissies binnen de skip en take parameters', type: Array<Commission>()})
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return { commissions: await this.commisionService.read(skip, take) };
    }

    @Post()
    @Auth('commission:write')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissie is aangemaakt', type: Commission})
    @ApiResponse({status: 400, description: 'Validation error...'})
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, body.created);

        return { commission: await this.commisionService.create(commission) };
    }

    @Put()
    @Auth('commission:write')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Commissie is geupdated', type: Commission})
    @ApiResponse({status: 400, description: 'Validation error...'})
    @ApiResponse({status: 404, description: 'Geen commissie gevonden...'})
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
