import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable()
export class DefaultGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthorizationService) {}

  async canActivate(context: ExecutionContext) {
    const scope = this.reflector.get<string>('scope', context.getHandler());
    if (!scope) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    if (!request.cookies.auth) {
        throw new UnauthorizedException('No authorization cookie found...');
    }
    const user = await this.authService.verifyJWT(request.cookies.auth);
    if (user && user.scopes.find(x => x.name === scope)) {
        return true;
    }

    return false;
  }
}
