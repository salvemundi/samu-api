import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user/user.service';
import { ApiProperty } from '@nestjs/swagger';
import { typeEnum } from '../entities/hateosLink.entity';

export class HATEOS {
    @ApiProperty({ format: 'uri', type: String })
    href: string;

    @ApiProperty()
    type: typeEnum;

    @ApiProperty()
    scope: string;
}

// tslint:disable-next-line: max-classes-per-file
export class SaMuResponse<T> {
    @ApiProperty()
    data: T;

    @ApiProperty({ isArray: true, type: HATEOS })
    links: HATEOS[];
}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class HateosInterceptor<T> implements NestInterceptor<T, SaMuResponse<T>> {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthorizationService,
      ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<SaMuResponse<T>>> {
        const links = [];

        // Only do this, if there is a valid auth cookie and the user has scopes
        const req = context.switchToHttp().getRequest();
        if (req.headers.cookie) {

            const auth = this.parseCookies(req).auth;
            if (auth) {

                const verifytoken = this.authService.verifyJWT(auth);
                if (verifytoken) {
                    const decodedJWT = this.authService.decodeJWT(auth);
                    const user: User = await this.userService.readOne(decodedJWT.userId, decodedJWT.email);

                    // Add HATOES links from each scope
                    for (const scope of user.scopes) {
                        for (const hatoesLink of scope.hatoesLinks) {
                            const link: HATEOS = {
                                href: hatoesLink.href,
                                type: hatoesLink.type,
                                scope: scope.name,
                            };

                            links.push(link);
                        }
                    }

                }
            }
        }

        return next.handle().pipe(map(data => ({ data, links })));
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
