import { createParamDecorator, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { User } from "../entities/user.entity";
import * as jwt from 'jsonwebtoken';
import { JWT } from "../services/authorization/authorization.service";

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

    const decodedJWT = jwt.verify(auth, process.env.JWT_SECRET).data as JWT;
    if (decodedJWT) {
        const user: User = await User.findOne({where: {id: decodedJWT.userId, email: decodedJWT.email}});

        if (!user) {
            throw new NotFoundException("User not found...")
        }

        return user; 

    } else {
        throw new UnauthorizedException('Token incorrect of verlopen...');
    }
});