import { createParamDecorator, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/entities/user.entity";

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
        const verifytoken = this.authService.verifyJWT(auth);
        if (verifytoken) {
            const decodedJWT = this.authService.decodeJWT(auth);
            const user: User = await this.userService.readOne(decodedJWT.userId, decodedJWT.email);
            return user;

        } else {
            throw new UnauthorizedException('Token incorrect of verlopen...');
        }
});