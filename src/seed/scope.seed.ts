import { Scope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, EntityManager } from 'typeorm';

@Injectable()
export class ScopeSeeder {
    private scopes: Scope[] = [
        new Scope('user:read', 1),
    ];

    public async seed() {
        const entityManager: EntityManager = getConnection().createEntityManager();
        await this.scopes.forEach(async (scope: Scope) => {
            if (await entityManager.findOne(Scope, {id: scope.id})) {
                return;
            }

            entityManager.save(Scope, scope);
        });
    }
}
