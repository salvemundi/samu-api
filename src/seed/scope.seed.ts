import { Scope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScopeSeeder {
    private scopes: Scope[] = [
        new Scope('user:read', 'Lid bekijken', 1),
        new Scope('user:write', 'Lid bewerken', 2),
        new Scope('user:delete', 'Lid verwijderen', 3),
        new Scope('committee:write', 'Commissies bewerken', 4),
        new Scope('committee:delete', 'Commissies verwijderen', 5),
        new Scope('accountancy:read', 'Boekhouden bekijken', 6),
        new Scope('accountancy:write', 'Boekhouden bewerken', 7),
        new Scope('accountancy:delete', 'boekhouden verwijderen', 8),
    ];

    public async seed() {
        this.scopes.forEach(async (scope: Scope) => {
            if (await Scope.findOne({ where: {id: scope.id}})) {
                return;
            }

            Scope.save(scope);
        });
    }
}
