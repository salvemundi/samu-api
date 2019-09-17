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
        res.cookie('auth', await this.authorizationService.genJWT(1, 'bastiankpn7800@gmail.com'), {secure: false});
        res.send({message: 'Logged in!'});
    }
}
