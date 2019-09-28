import { Controller, Get, Param, HttpCode, NotFoundException, Body, Put, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dto/user/update-user-dto';
import { ShortedUserDto } from '../../dto/user/shorted-user-dto';
import { Auth } from '../../decorators/auth.decorator';
import { classToPlain } from 'class-transformer';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get('/:id')
    @Auth('user:read')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Gebruiker gevonden', type: User })
    @ApiResponse({ status: 404, description: 'Geen gebruiker gevonden...' })
    async readOne(@Param('id') id: number) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`Geen gebruiker gevonden met id: ${id}`);
        }

        return user;
    }

    @Get()
    @Auth('user:read')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Gebruikers gevonden binnen skip en take parameters', type: Array<ShortedUserDto>() })
    async readAll(@Param('skip') skip: number, @Param('take') take: number) {
        const users: User[] = await this.userService.readAll(skip, take);
        return { users: users as ShortedUserDto[] };
    }

    @Put()
    @Auth('user:write')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Gebruiker is geupdated', type: User })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 404, description: 'Geen gebruiker gevonden...' })
    async update(@Body() body: UpdateUserDto) {
        const user = await this.userService.readOne(body.id);
        if (!user) {
            throw new NotFoundException(`Geen gebruiker gevonden met id: ${body.id}`);
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

}
