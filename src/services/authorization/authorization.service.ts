import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(email: string, pass: string): Promise<User> {
        const user: User = await User.findOne({where: { email, password: pass }});
        if (user) {
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
}

interface JWT {
    userId: number;
    email: string;
}
