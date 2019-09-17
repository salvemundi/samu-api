import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { UserService } from '../services/user/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class DefaultGuard implements CanActivate {
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
    if (!request.cookies.auth) {
        throw new UnauthorizedException('No authorization cookie found...');
    }

    const verifyoken = this.authService.verifyJWT(request.cookies.auth);
    if (verifyoken) {
      const decodedJWT = this.authService.decodeJWT(request.cookies.auth);
      const user: User = await this.userService.readOne(decodedJWT.userId, decodedJWT.email);

      return (!!user && !!user.scopes.find(x => x.name === scope));

    } else {
      throw new UnauthorizedException('Token expired...');
    }
  }
}
