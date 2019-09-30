import { Controller, Get, Param, HttpCode, NotFoundException, Body, Put, Req, UnauthorizedException, Delete } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { ApiResponse, ApiUseTags, ApiImplicitParam, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dto/user/update-user-dto';
import { Auth } from '../../decorators/auth.decorator';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { ShortedUserDto } from '../../dto/user/shorted-user-dto';

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthorizationService,
    ) { }

    @Get('/me')
    @HttpCode(200)
    @ApiOperation({
        title: 'me',
        description: 'This call is used to get the current user',
    })
    @ApiResponse({ status: 200, description: 'Found you', type: User })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readMe(@Req() request: any) {
        if (!request.headers.cookie) {
            throw new UnauthorizedException('Geen koekje gevonden in je request... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
        }
        const list: any = {};
        const rc = request.headers.cookie;
        if (rc) {
            rc.split(';').forEach((cookie) => {
                const parts = cookie.split('=');
                list[parts.shift().trim()] = decodeURI(parts.join('='));
            });
        }

        const auth = list.auth;
        if (!auth) {
            throw new UnauthorizedException('No authorizatie koekje gevonden... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
        }
        const verifytoken = this.authService.verifyJWT(auth);
        if (verifytoken) {
            const decodedJWT = this.authService.decodeJWT(auth);
            const user: User = await this.userService.readOne(decodedJWT.userId, decodedJWT.email);
            return user;

        } else {
            throw new UnauthorizedException('Token incorrect of verlopen...');
        }
    }

    @Get('/:id')
    @Auth('user:read')
    @HttpCode(200)
    @ApiOperation({
        title: 'getOne',
        description: 'This call is used to get a specific user',
    })
    @ApiResponse({ status: 200, description: 'User found!', type: User })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
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
        title: 'getAll',
        description: 'This call is used to get a summary of all the users',
    })
    @ApiImplicitParam({name: 'skip', required: false, type: Number })
    @ApiImplicitParam({name: 'take', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Users within the skip and take parameter', type: ShortedUserDto, isArray: true })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async readAll(@Param('skip') skip?: number, @Param('take') take?: number) {
        const users: User[] = await this.userService.readAll(skip, take);
        return { users: users as ShortedUserDto[] };
    }

    @Put()
    @Auth('user:write')
    @HttpCode(200)
    @ApiOperation({
        title: 'update',
        description: 'This call is used to update a user',
    })
    @ApiResponse({ status: 200, description: 'User has been updated!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
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

        return { User: await this.userService.update(user) };
    }

    @Delete('/:id')
    @Auth('user:delete')
    @HttpCode(200)
    @ApiOperation({
        title: 'delete',
        description: 'This call is used to delete a user',
    })
    @ApiResponse({ status: 200, description: 'User is deleted!' })
    @ApiResponse({ status: 403, description: 'U do not have the permission to do this...' })
    @ApiResponse({ status: 404, description: 'No user found...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async delete(@Param('id') id: number) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        this.userService.delete(user);
    }
}
