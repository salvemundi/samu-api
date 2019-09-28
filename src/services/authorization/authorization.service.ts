import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IAuthorizationService } from './iAuthorization.service';
import { getConnection } from 'typeorm';

@Injectable()
export class AuthorizationService implements IAuthorizationService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(email: string, pass: string): Promise<User> {
        const user: User = await User.findOne({where: {email}, select: ['password']});
        if (user && await this.checkPassword(pass, user)) {
            return await User.findOne({where: { email }});
        }

        return null;
    }

    public async genJWT(userId: number, email: string): Promise<string> {
        const data: JWT = { userId, email };
        return this.jwtService.sign(data);
    }

    public verifyJWT(jwt: string): boolean {
        try {
            return !!this.jwtService.verify(jwt);

        } catch (err) {
            return false;
        }
    }

    public decodeJWT(jwt): JWT {
        return this.jwtService.decode(jwt) as JWT;
    }

    private checkPassword(password: string, user: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    reject(err);

                } else {
                    resolve(res);
                }
            });
        });
    }
}

export interface JWT {
    userId: number;
    email: string;
}
