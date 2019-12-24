import { Scope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';
import { HatoesLink, typeEnum } from '../entities/hateosLink.entity';

@Injectable()
export class ScopeSeeder {
    private scopes: Scope[] = [
        new Scope('user:read', 'Lid bekijken', 1, [
            new HatoesLink('/member', typeEnum.get, 1),
            new HatoesLink('/member/:id', typeEnum.get, 2),
        ]),
        new Scope('user:write', 'Lid bewerken', 2, [
            new HatoesLink('/member/:id', typeEnum.post, 3),
            new HatoesLink('/member/:id', typeEnum.put, 4),
        ]),
        new Scope('user:delete', 'Lid verwijderen', 3, [
            new HatoesLink('/member/:id', typeEnum.delete, 5),
        ]),
        new Scope('committee:write', 'Commissies bewerken', 4, []),
        new Scope('committee:delete', 'Commissies verwijderen', 5, []),
    ];

    public async seed() {
        this.scopes.forEach(async (scope: Scope) => {
            if (! (await Scope.findOne({ where: {id: scope.id}}))) {
                Scope.save(scope);
            }

            scope.hatoesLinks.forEach(async (link: HatoesLink) => {
                if (! (await HatoesLink.findOne({ where: { id: link.id } } )) ) {
                    link.scope = scope;
                    HatoesLink.save(link);
                }
            });
        });
    }
}
