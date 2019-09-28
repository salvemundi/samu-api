import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException, Delete } from '@nestjs/common';
import { CommissionService } from '../../services/commission/commission.service';
import { Commission } from '../../entities/commission.entity';
import { CreateCommissionDto } from '../../dto/commission/create-commission-dto';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/commission/update-commission-dto';
import { Auth } from '../../decorators/auth.decorator';

@ApiUseTags('Commissions')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commisionService: CommissionService) {}

    @Get('/:id')
    @HttpCode(200)
    @ApiOperation({
        title: 'getOne',
        description: 'This call is used to get a specific commission',
    })
    @ApiResponse({ status: 200, description: 'Commissie is gevonden', type: Commission })
    @ApiResponse({ status: 404, description: 'Geen commissie gevonden...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readOne(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(+id);
        if (!commission) {
            throw new NotFoundException(`Geen commissie met id: ${id}.`);
        }

        return commission;
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({
        title: 'getAll',
        description: 'This call is used to get a summary of all the commissions',
    })
    @ApiResponse({ status: 200, description: 'Commissies binnen de skip en take parameters', type: Commission, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return await this.commisionService.read(skip, take);
    }

    @Post()
    @Auth('commission:write')
    @HttpCode(200)
    @ApiOperation({
        title: 'create',
        description: 'This call is used to create a commission',
    })
    @ApiResponse({ status: 200, description: 'Commissie is aangemaakt', type: Commission })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async create(@Body() body: CreateCommissionDto) {
        const commission = new Commission(body.name, body.description, new Date());
        return await this.commisionService.create(commission);
    }

    @Put()
    @Auth('commission:write')
    @HttpCode(200)
    @ApiOperation({
        title: 'update',
        description: 'This call is used to update a commission',
    })
    @ApiResponse({ status: 200, description: 'Commissie is geupdated', type: Commission })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 404, description: 'Geen commissie gevonden...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async update(@Body() body: UpdateCommissionDto) {
        const commission = await this.commisionService.readOne(body.id);
        if (!commission) {
            throw new NotFoundException(`No commission exists with id: ${body.id}.`);
        }

        commission.description = body.description;
        commission.name = body.name;

        return await this.commisionService.update(commission);
    }

    @Delete('/:id')
    @Auth('commission:delete')
    @HttpCode(200)
    @ApiOperation({
        title: 'delete',
        description: 'This call is used to delete a commission',
    })
    @ApiResponse({ status: 200, description: 'Commissie is verwijderd' })
    @ApiResponse({ status: 404, description: 'Geen commissie gevonden...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async delete(@Param('id') id: number) {
        const commission = await this.commisionService.readOne(id);
        if (!commission) {
            throw new NotFoundException(`No commission exists with id: ${id}.`);
        }

        this.commisionService.delete(commission);
    }
}
