import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Res } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { UserService } from '../services/user/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthorizationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const scope = this.reflector.get<string>('scope', context.getHandler());
    if (!scope) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.headers.cookie) {
      throw new UnauthorizedException('Geen koekje gevonden in je request... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
    }
    const auth = this.parseCookies(request).auth;
    if (!auth) {
        throw new UnauthorizedException('No authorizatie koekje gevonden... Zorg ervoor dat deze meegestuurd wordt met iedere request!');
    }

    const verifytoken = this.authService.verifyJWT(auth);
    if (verifytoken) {
      const decodedJWT = this.authService.decodeJWT(auth);
      const user: User = await this.userService.readOne(decodedJWT.userId, decodedJWT.email);

      if (!!user && !!user.scopes.find(x => x.name === scope)) {
        const reponse = context.switchToHttp().getResponse();
        reponse.cookie('auth', await this.authService.genJWT(user.id, user.email), process.env.env !== 'Testing' ? { domain: '.salvemundi.nl' } : {});
        return true;
      }

      return false;

    } else {
      throw new UnauthorizedException('Token incorrect of verlopen...');
    }
  }

  private parseCookies(request): any {
    const list = {};
    const rc = request.headers.cookie;

    if (rc) {
      rc.split(';').forEach((cookie) => {
          const parts = cookie.split('=');
          list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    }

    return list;
}
}
