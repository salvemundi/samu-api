import { Controller, Get, Param, HttpCode, NotFoundException, Body, Put, Delete, Res } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiExtraModels } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dto/user/update-user-dto';
import { Auth } from '../../decorators/auth.decorator';
import { SummaryUserDto } from '../../dto/user/summary-user-dto';
import { Me } from '../../decorators/me.decorator';
import { Membership } from '../../entities/membership.entity';
import { FileService } from '../../services/file/file.service';
import { Response } from 'express';

@ApiTags('User')
@ApiExtraModels(Membership)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileService,
    ) { }

    @Get('/me')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userReadMe',
        summary: 'me',
        description: 'This call is used to get the current user',
    })
    @ApiResponse({ status: 200, description: 'Found you', type: User })
    @ApiResponse({ status: 404, description: 'Did not found you' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readMe(@Me() me: Promise<User>) {
        return me;
    }

    @Put('/me')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userUpdateMe',
        summary: 'me',
        description: 'This call is used to update the current user',
    })
    @ApiResponse({ status: 200, description: 'Updated you', type: User })
    @ApiResponse({ status: 404, description: 'Did not found you' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async updateMe(@Me() me: User, @Body() body: UpdateUserDto) {
        me.pcn = body.pcn;
        me.firstName = body.firstName;
        me.lastName = body.lastName;
        me.birthday = body.birthday;
        me.address = body.address;
        me.postalcode = body.postalcode;
        me.city = body.city;
        me.country = body.country;
        me.phoneNumber = body.phoneNumber;
        me.email = body.email;

        return await me.save();
    }

    @Get('/:id')
    @Auth('user:read')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userReadOne',
        summary: 'getOne',
        description: 'This call is used to get a specific user',
    })
    @ApiResponse({ status: 200, description: 'User found!', type: User })
    @ApiResponse({ status: 403, description: 'You do not have the permission to do this...' })
    @ApiResponse({ status: 404, description: 'No user found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readOne(@Param('id') id: number) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        return user;
    }

    @Get()
    @Auth('user:read')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userReadAll',
        summary: 'getAll',
        description: 'This call is used to get a summary of all the users',
    })
    @ApiParam({name: 'skip', required: false, type: Number })
    @ApiParam({name: 'take', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Users within the skip and take parameter', type: SummaryUserDto, isArray: true })
    @ApiResponse({ status: 403, description: 'You do not have the permission to do this...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readAll(@Param('skip') skip?: number, @Param('take') take?: number) {
        const users: User[] = await this.userService.readAll(skip, take);
        const summaries: SummaryUserDto[] = [];

        users.forEach(user => {
            let memberTill = new Date(0);
            if (user.memberships) {
                user.memberships.forEach(membership => {
                    if (memberTill < membership.endDate) {
                        memberTill = membership.endDate;
                    }
                });
            }

            summaries.push({
                id: user.id,
                pcn: user.pcn,
                firstName: user.firstName,
                lastName: user.lastName,
                memberTill,
            });
        });

        return summaries;
    }

    @Put()
    @Auth('user:write')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userUpdateOne',
        summary: 'update',
        description: 'This call is used to update a user',
    })
    @ApiResponse({ status: 200, description: 'User has been updated!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 403, description: 'You do not have the permission to do this...' })
    @ApiResponse({ status: 404, description: 'No user found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async update(@Body() body: UpdateUserDto) {
        const user = await this.userService.readOne(body.id);
        if (!user) {
            throw new NotFoundException(`No user found with id: ${body.id}`);
        }

        user.pcn = body.pcn;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.birthday = body.birthday;
        user.address = body.address;
        user.postalcode = body.postalcode;
        user.city = body.city;
        user.country = body.country;
        user.phoneNumber = body.phoneNumber;
        user.email = body.email;

        return await this.userService.update(user);
    }

    @Delete('/:id')
    @Auth('user:delete')
    @HttpCode(200)
    @ApiOperation({
        operationId: 'userDeleteOne',
        summary: 'delete',
        description: 'This call is used to delete a user',
    })
    @ApiResponse({ status: 200, description: 'User is deleted!' })
    @ApiResponse({ status: 403, description: 'You do not have the permission to do this...' })
    @ApiResponse({ status: 404, description: 'No user found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async delete(@Param('id') id: number) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        this.userService.delete(user);
    }

    @Get('/:id/photo')
    @HttpCode(200)
    async getPicture(@Param('id') id: number, @Res() res: Response) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        res.download(this.fileService.getProfilePicturePath(user.profilePicture));
    }
}
