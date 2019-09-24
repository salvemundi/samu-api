import { Controller, Post, Res, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RegisterDTO } from '../../dto/authorization/RegisterDTO';
import { LoginDTO } from '../../dto/authorization/LoginDTO';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
        private readonly userService: UserService,
    ) { }

    @Post('/login')
    async login(@Res() res: Response, @Body() body: LoginDTO) {
        const user: User = await this.authorizationService.validateUser(body.email, body.password);
        if (user === null) {
            throw new UnauthorizedException('Email or password is wrong...');
        }

        res.cookie('auth', await this.authorizationService.genJWT(user.id, user.email), {secure: false});
        res.status(200).send({message: 'Logged in!'});
    }

    @Post('/register')
    async regiser(@Body() body: RegisterDTO) {
        if (await this.userService.exists(body.email)) {
            throw new BadRequestException('User with email address this already exists');
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
        return user;
    }

    private encryptPassword(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    reject(err);

                } else {
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                            reject(err);
                        
                        } else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }
}
