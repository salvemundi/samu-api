import { createParamDecorator, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { User } from "../entities/user.entity";
import * as jwt from 'jsonwebtoken';
import { JWT } from "../services/authorization/authorization.service";
import randomUser from "../services/user/mock.user.service";
import { USER_RELATIONS } from "../services/user/user.service";
import { testJWToken } from "../services/authorization/mock.authorization.service";

export const Me = createParamDecorator(async (data: any, request: Request): Promise<User> => {
    if (!request.headers.cookie) {
        throw new UnauthorizedException('Geen koekje gevonden in je request... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
    }
    const list: any = {};
    const rc = request.headers.cookie;
    if (rc) {
        rc.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }

    const auth = list.auth;
    if (!auth) {
        throw new UnauthorizedException('No authorizatie koekje gevonden... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
    }

    try {
        const decodedJWT = decodeJWT(auth);
        const user: User = await getUser(decodedJWT.userId, decodedJWT.email);

        if (!user) {
            throw new NotFoundException("User not found...")
        }

        return user; 

    } catch(err) {
        throw new UnauthorizedException('Token incorrect of verlopen...');
    }
});

function decodeJWT(token: string): JWT {
    if (token === testJWToken) {
        // App is in test mode
        return {
            email: 'admin@gmail.com',
            userId: 1,
        };

    } else {
        // App is not in test mode
        return jwt.verify(token, process.env.JWT_SECRET) as JWT;
    }
}

async function getUser(userId: number, email: string) {
    try {
        // Used when app is not being tested
        return await User.findOne({where: {id: userId, email}, relations: USER_RELATIONS});

    } catch {
        // Used when the app is being tested
        if (userId === 1) {
            return randomUser;

        } else {
            return undefined;
        }
    }
}