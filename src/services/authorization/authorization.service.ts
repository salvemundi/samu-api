import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IAuthorizationService } from './iAuthorization.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizationService implements IAuthorizationService {
    public async validateUser(email: string, pass: string): Promise<User> {
        const user: User = await User.findOne({where: {email}, select: ['password']});
        if (user && await this.checkPassword(pass, user)) {
            return await User.findOne({where: { email }});
        }

        return null;
    }

    public async genJWT(userId: number, email: string): Promise<string> {
        const data: JWT = { userId, email };
        return jwt.sign(data, process.env.JWT_SECRET , { expiresIn: '1h'});
    }

    public verifyJWT(token: string): boolean {
        try {
            return !!jwt.verify(token, process.env.JWT_SECRET);

        } catch (err) {
            return false;
        }
    }

    public decodeJWT(token: string): JWT {
        return jwt.verify(token, process.env.JWT_SECRET) as JWT;
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
