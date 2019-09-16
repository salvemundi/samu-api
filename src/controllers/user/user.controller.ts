import { Controller, Get, Param, HttpCode, NotFoundException, Body, Put, Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/user/create-user-dto';
import { UpdateUserDto } from '../../dto/user/update-user-dto';
import { ShortedUserDto } from '../../dto/user/shorted-user-dto';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) { }

    @Get('/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User is found.', type: User })
    @ApiResponse({ status: 404, description: 'No user was found with the provided id.' })
    async readOne(@Param('id') id: number) {
        const user: User = await this.userService.readOne(+id);
        if (!user) {
            throw new NotFoundException(`No user found exists with id: ${id}`);
        }

        return { user };
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Users that match the skip and take parameters.', type: Array<ShortedUserDto>() })
    async readAll(@Param('skip') skip: number, @Param('take') take: number) {
        const users: User[] = await this.userService.readAll(skip, take);
        return { users: users as ShortedUserDto[] };
    }

    @Post()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User is created.', type: User })
    @ApiResponse({ status: 400, description: 'Validation errors.' })
    async create(@Body() body: CreateUserDto) {
        const user = new User();
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User is updated.', type: User })
    @ApiResponse({ status: 400, description: 'Validation errors.' })
    @ApiResponse({ status: 404, description: 'No user was found with the provided id.' })
    async update(@Body() body: UpdateUserDto) {
        const user = await this.userService.readOne(body.id);
        if (!user) {
            throw new NotFoundException(`No user exists with id: ${body.id}.`);
        }

        user.pcn = body.pcn;
        user.firstName = body.firstName;
        user.middleName = body.middleName;
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
