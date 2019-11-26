import { Controller, Post, Res, Body, UnauthorizedException, BadRequestException, HttpCode, Get, Query, ConflictException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RegisterDto } from '../../dto/authorization/register-dto';
import { LoginDto } from '../../dto/authorization/login-dto';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import axios from 'axios';
import { MeDto } from '../../dto/authorization/me-dto';
import { ConfirmationDto } from '../../dto/authorization/confirmation-dto';
import { ConfirmationService } from '../../services/confirmation/confirmation.service';

@ApiUseTags('Authorization')
@Controller('/authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly userService: UserService,
        private readonly confirmationService: ConfirmationService,
    ) { }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({
        title: 'login',
        description: 'This call is used to login an user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Logged in!' })
    @ApiResponse({ status: 401, description: 'Email or password is incorrect...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async login(@Res() res: any, @Body() body: LoginDto) {
        const user: User = await this.authorizationService.validateUser(body.email, body.password);
        if (user === null) {
            throw new UnauthorizedException('Email or password is incorrect...');
        }

        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email));
        res.status(200).send({message: 'Ingelogd!'});
    }

    @Post('/register')
    @HttpCode(200)
    @ApiOperation({
        title: 'register',
        description: 'This call is used to register an user',
    })
    @ApiResponse({ status: 200, description: 'Registered!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error...'})
    @ApiResponse({ status: 409, description: 'Er bestaat al een gebruiker met die email adres...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async regiser(@Body() body: RegisterDto) {
        if (await this.userService.exists(body.email)) {
            throw new ConflictException('Er bestaat al een gebruiker met die email adres...');
        }

        const user = new User();
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.email = body.email;
        user.birthday = body.birthday;
        user.address = body.address;
        user.city = body.city;
        user.country = body.country;
        user.phoneNumber = body.phoneNumber;
        user.postalcode = body.postalcode;
        user.registeredSince = new Date();
        user.activated = false;
        user.pcn = body.pcn;
        user.scopes = [];
        user.member = null;

        await this.userService.create(user);
        return user;
    }

    @Get('me')
    @HttpCode(200)
    @ApiOperation({
        title: 'me',
        description: 'This call is used to get the user from the FHICT api',
    })
    @ApiResponse({ status: 200, description: 'Geregisteerd!', type: MeDto })
    @ApiResponse({ status: 400, description: 'Incorrecte Oauth token verkregen...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async me(@Query('token') token: string) {
        try {
            const {data} = await axios.get('https://api.fhict.nl/people/me', {headers: {Authorization: 'bearer ' + token}});
            const me: MeDto = {
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

    @Post('confirmation')
    @HttpCode(200)
    @ApiOperation({
        title: 'confirmation',
        description: 'This call is used to activate an user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Activated!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 404, description: 'The token does not correspond to a confirmation...'})
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async confirmEmail(@Res() res: Response, @Body() body: ConfirmationDto) {
        const confirmation = await this.confirmationService.readOne(body.token);
        if (!confirmation) {
            throw new NotFoundException('Confirmation not found...');
        }

        const user = confirmation.user;
        user.password = await this.encryptPassword(body.password);

        await this.userService.update(user);
        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email));
        res.status(200).send(user);
    }

    private encryptPassword(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject(err);
                } else {
                    bcrypt.hash(password, salt, (err2, hash) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }
}
