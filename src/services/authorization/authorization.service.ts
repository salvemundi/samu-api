import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(email: string, pass: string): Promise<User> {
        const user: User = await User.findOne({where: { email }});
        if (user && await this.checkPassword(pass, user)) {
            return user;
        }

        return null;
    }

    public async genJWT(userId: number, email: string) {
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

    public decodeJWT(jwt) {
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

interface JWT {
    userId: number;
    email: string;
}
