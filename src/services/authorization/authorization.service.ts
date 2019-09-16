import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(usernameInput: string, pass: string): Promise<any> {
        const user: User = await this.userService.readOne(usernameInput);
        if (user && user.password === pass) {
            const { password, username, ...result } = user;
            return result;
        }

        return null;
    }

    public async genJWT(userId: number) {
        return this.jwtService.sign({user: userId});
    }

    public async verifyJWT(jwt: string): Promise<User> {
        try {
            if (this.jwtService.verifyAsync(jwt)) {
                const decodedJWT = this.jwtService.decode(jwt) as JWT;
                return this.userService.readOne(decodedJWT.user);
            }
        } catch (e) { return null; }
        return null;
    }
}

interface JWT {
    user: number;
}
