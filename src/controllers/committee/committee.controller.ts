import { Controller, Post, Body, HttpCode, Get, Query, Param, Put, NotFoundException, Delete } from '@nestjs/common';
import { CommitteeService } from "../../services/committee/committee.service";
import { Committee } from '../../entities/committee.entity';
import { CreateCommissionDto } from '../../dto/committee/create-commission-dto';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateCommissionDto } from '../../dto/committee/update-commission-dto';
import { Auth } from '../../decorators/auth.decorator';
import AddCommitteeMemberDto from 'src/dto/committee/add-committee-member-dto';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/entities/user.entity';

@ApiUseTags('Committee')
@Controller('committee')
export class CommitteeController {
    constructor(
        private readonly committeeService: CommitteeService,
        private readonly userService: UserService
    ) { }

    @Get('/:id')
    @HttpCode(200)
    @ApiOperation({
        title: 'getOne',
        description: 'This call is used to get a specific committee',
    })
    @ApiResponse({ status: 200, description: 'The committee found', type: Committee })
    @ApiResponse({ status: 404, description: 'No committee found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readOne(@Param('id') id: number) {
        const committee = await this.committeeService.readOne(+id);
        if (!committee) {
            throw new NotFoundException(`Geen commissie met id: ${id}.`);
        }

        return committee;
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({
        title: 'getAll',
        description: 'This call is used to get a summary of all the committees',
    })
    @ApiResponse({ status: 200, description: 'Committees within the skip en take parameters', type: Committee, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readAll(@Query('skip') skip: number, @Query('take') take: number) {
        return await this.committeeService.read(skip, take);
    }

    @Post()
    @Auth('committee:write')
    @HttpCode(200)
    @ApiOperation({
        title: 'create',
        description: 'This call is used to create a committee',
    })
    @ApiResponse({ status: 200, description: 'The committee has been created!', type: Committee })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async create(@Body() body: CreateCommissionDto) {
        const committee = new Committee(body.name, body.description, new Date());
        return await this.committeeService.create(committee);
    }

    @Put()
    @Auth('committee:write')
    @HttpCode(200)
    @ApiOperation({
        title: 'update',
        description: 'This call is used to update a committee',
    })
    @ApiResponse({ status: 200, description: 'The committee has been updated!', type: Committee })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 404, description: 'No committee found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async update(@Body() body: UpdateCommissionDto) {
        const committee = await this.committeeService.readOne(body.id);
        if (!committee) {
            throw new NotFoundException(`No committee exists with id: ${body.id}.`);
        }

        committee.description = body.description;
        committee.name = body.name;

        return await this.committeeService.update(committee);
    }

    @Delete('/:id')
    @Auth('committee:delete')
    @HttpCode(200)
    @ApiOperation({
        title: 'delete',
        description: 'This call is used to delete a committee',
    })
    @ApiResponse({ status: 200, description: 'Committee deleted!' })
    @ApiResponse({ status: 404, description: 'No committee found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async delete(@Param('id') id: number) {
        const committee = await this.committeeService.readOne(id);
        if (!committee) {
            throw new NotFoundException(`No committee found with id: ${id}.`);
        }

        this.committeeService.delete(committee);
    }

    @Get("/{committeeName}")
    async getCommittee(@Param("committeeName") committeeName: string) {

    }

    @Post("/{committeeName}/members/add")
    async addCommitteeMember(@Param("committeeName") committeeName: string, @Body() addCommitteeMemberDto: AddCommitteeMemberDto) {
        const user: User = await this.userService.readOne(addCommitteeMemberDto.userId);
        const committee: Committee = await this.committeeService.getCommitteeByName(committeeName);

        this.committeeService.addMember(committee, user);
    }

    @Delete("/{committeeName}/members/remove")
    async removeMembers(@Param("committeeName") committeeName: string, @Body() removeCommitteeMemberDto: RemoveCommitteeMemberDto) { }
}
