import { Controller, Post, Res, Body, UnauthorizedException, BadRequestException, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RegisterDTO } from '../../dto/authorization/RegisterDTO';
import { LoginDTO } from '../../dto/authorization/LoginDTO';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '@nestjs/swagger';

@Controller('authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly userService: UserService,
    ) { }

    @Post('/login')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Logged in!'})
    @ApiResponse({status: 401, description: 'Email or password is incorrect...'})
    async login(@Res() res: Response, @Body() body: LoginDTO) {
        const user: User = await this.authorizationService.validateUser(body.email, body.password);
        if (user === null) {
            throw new UnauthorizedException('Email or password is incorrect...');
        }

        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email), {secure: false});
        res.status(200).send({message: 'Ingelogd!'});
    }

    @Post('/register')
    @HttpCode(200)
    @ApiResponse({status: 200, description: 'Geregisteerd!', type: User})
    @ApiResponse({status: 400, description: 'Er bestaat al een gebruiker met die email adres...'})
    async regiser(@Res() res: Response, @Body() body: RegisterDTO) {
        if (await this.userService.exists(body.email)) {
            throw new BadRequestException('Er bestaat al een gebruiker met die email adres...');
        }

        const user = new User();
        user.firstName = body.firstName;
        user.middleName = body.middleName;
        user.lastName = body.lastName;
        user.email = body.email;
        user.password = await this.encryptPassword(body.password);
        user.birthday = body.birthday;
        user.address = body.address;
        user.city = body.city;
        user.country = body.country;
        user.phoneNumber = body.phoneNumber;
        user.postalcode = body.postalcode;
        user.registeredSince = new Date();
        user.pcn = body.pcn;
        user.scopes = [];
        user.member = null;

        this.userService.create(user);
        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email), {secure: false});
        res.status(200).send(user);
    }

    private encryptPassword(password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err2, hash) => {
                    resolve(hash);
                });
            });
        });
    }
}
