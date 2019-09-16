import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Controller('authorization')
export class AuthorizationController {

    constructor(
        private readonly authorizationService: AuthorizationService,
    ) { }

    @Post('/login')
    async login(@Res() res: Response) {
        // TODO: make env variable that sets secure to either true or false.
        res.cookie('auth', await this.authorizationService.genJWT(1), {httpOnly: false, secure: true, sameSite: true});
        res.send({message: 'Logged in!'});
    }
}
