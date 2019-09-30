import { Controller, Post, Res, Body, UnauthorizedException, BadRequestException, HttpCode, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RegisterDTO } from '../../dto/authorization/RegisterDTO';
import { LoginDTO } from '../../dto/authorization/LoginDTO';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import axios from 'axios';
import { MeDTO } from '../../dto/authorization/MeDTO';

@ApiUseTags('Authorization')
@Controller('authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly userService: UserService,
    ) { }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({
        title: 'login',
        description: 'This call is used to login a user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Logged in!' })
    @ApiResponse({ status: 401, description: 'Email or password is incorrect...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
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
    @ApiOperation({
        title: 'register',
        description: 'This call is used to register a user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Geregisteerd!', type: User })
    @ApiResponse({ status: 400, description: 'Er bestaat al een gebruiker met die email adres...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async regiser(@Res() res: Response, @Body() body: RegisterDTO) {
        if (await this.userService.exists(body.email)) {
            throw new BadRequestException('Er bestaat al een gebruiker met die email adres...');
        }

        const user = new User();
        user.firstName = body.firstName;
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

    @Get('me')
    @HttpCode(200)
    @ApiOperation({
        title: 'me',
        description: 'This call is used to get the user from the FHICT api',
    })
    @ApiResponse({ status: 200, description: 'Geregisteerd!', type: MeDTO })
    @ApiResponse({ status: 400, description: 'Incorrecte Oauth token verkregen...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async me(@Query('token') token: string) {
        try {
            const {data} = await axios.get('https://api.fhict.nl/people/me', {headers: {Authorization: 'bearer ' + token}});
            const me: MeDTO = {
                firstName: data.givenName,
                lastName: data.surName,
                email: data.mail,
                pcn: data.id,
            };
            return me;

        } catch (err) {
            throw new BadRequestException('Incorrecte Oauth token verkregen...');
        }
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
