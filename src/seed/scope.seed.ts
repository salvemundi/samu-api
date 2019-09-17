import { Scope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';
import { getConnection, EntityManager } from 'typeorm';

@Injectable()
export class ScopeSeeder {
    private scopes: Scope[] = [
        new Scope('user:read', 1),
        new Scope('user:wrie', 2),
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
