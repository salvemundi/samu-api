import { Scope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, EntityManager } from 'typeorm';

@Injectable()
export class ScopeSeeder {
    private scopes: Scope[] = [
        new Scope('user:read', 1),
        new Scope('user:write', 2),
        new Scope('user:delete', 3),
        new Scope('commission:write', 4),
        new Scope('commission:delete', 5),
    ];

    public async seed() {
        await this.scopes.forEach(async (scope: Scope) => {
            if (await Scope.findOne({ where: {id: scope.id}})) {
                return;
            }
            Scope.save(scope);
        });
    }
}
