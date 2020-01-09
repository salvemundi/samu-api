import { Controller, Post, Res, Body, UnauthorizedException, HttpCode, Get, Query, NotFoundException, InternalServerErrorException, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RegisterDTO } from '../../dto/authorization/RegisterDTO';
import { LoginDTO } from '../../dto/authorization/LoginDTO';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse, ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import axios from 'axios';
import { MeDTO } from '../../dto/authorization/MeDTO';
import { ConfirmationDTO } from '../../dto/authorization/confirmationDTO';
import { ConfirmationService } from '../../services/confirmation/confirmation.service';
import { FileService, FileInterface } from '../../services/file/file.service';

@ApiTags('Authorization')
@Controller('/authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly userService: UserService,
        private readonly confirmationService: ConfirmationService,
        private readonly fileService: FileService,
    ) { }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({
        summary: 'login',
        description: 'This call is used to login an user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Logged in!' })
    @ApiResponse({ status: 401, description: 'Email or password is incorrect...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async login(@Res() res: any, @Body() body: LoginDTO) {
        const user: User = await this.authorizationService.validateUser(body.email, body.password);
        if (user === null) {
            throw new UnauthorizedException('Email or password is incorrect...');
        }

        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email), process.env.env !== 'Testing' ? { domain: '.salvemundi.nl' } : {});
        res.status(200).send({message: 'Ingelogd!'});
    }

    @Post('/register')
    @UseInterceptors(FileInterceptor('profilePicture'))
    @ApiConsumes('multipart/form-data')
    @HttpCode(200)
    @ApiOperation({
        summary: 'register',
        description: 'This call is used to register an user',
    })
    @ApiResponse({ status: 200, description: 'Registered!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error...'})
    @ApiResponse({ status: 409, description: 'Er bestaat al een gebruiker met dat email adres...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async regiser(@Body() body: RegisterDTO, @UploadedFile() profilePicture: FileInterface) {
        if (await this.userService.exists(body.email)) {
            throw new ConflictException('Er bestaat al een gebruiker met dat email adres...');
        }

        await this.fileService.saveProfilePicture(profilePicture.originalname, profilePicture.buffer);

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
        user.profilePicture = profilePicture.originalname;
        user.scopes = [];
        user.memberships = [];

        await this.userService.create(user);
        return user;
    }

    @Get('me')
    @HttpCode(200)
    @ApiOperation({
        summary: 'me',
        description: 'This call is used to get the user from the FHICT api',
    })
    @ApiResponse({ status: 200, description: 'Geregisteerd!', type: MeDTO })
    @ApiResponse({ status: 400, description: 'Incorrecte Oauth token verkregen...' })
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async me(@Query('token') token: string) {
        try {
            const accessData = await axios.post('https://identity.fhict.nl/connect/token', 'grant_type=authorization_code&code=' + token + '&redirect_uri=https://salvemundi.nl/callback&client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

            const userData = await axios.get('https://api.fhict.nl/people/me', {headers: {Authorization: accessData.data.token_type + ' ' + accessData.data.access_token}});
            const me: MeDTO = {
                firstName: userData.data.givenName,
                lastName: userData.data.surName,
                email: userData.data.mail,
                pcn: userData.data.id,
            };
            return me;
        } catch (err) {
            console.log(err.response);
            throw new InternalServerErrorException(err);
        }
    }

    @Post('confirmation')
    @HttpCode(200)
    @ApiOperation({
        summary: 'confirmation',
        description: 'This call is used to activate an user. It will return an authorization cookie when succesful',
    })
    @ApiResponse({ status: 200, description: 'Activated!', type: User })
    @ApiResponse({ status: 400, description: 'Validation error...' })
    @ApiResponse({ status: 404, description: 'The token does not correspond to a confirmation...'})
    @ApiResponse({ status: 500, description: 'Internal server error...' })
    async confirmEmail(@Res() res: Response, @Body() body: ConfirmationDTO) {
        const confirmation = await this.confirmationService.readOne(body.token);
        if (!confirmation) {
            throw new NotFoundException('Confirmation not found...');
        }

        const user = confirmation.user;
        user.password = await this.encryptPassword(body.password);
        user.activated = true;

        await this.userService.update(user);
        await confirmation.remove();

        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email), process.env.env !== 'Testing' ? { domain: '.salvemundi.nl' } : {});
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
