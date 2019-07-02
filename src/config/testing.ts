import { createConnection } from 'typeorm';

export class DatabaseSeeder {
    public async before() {
        const connection = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'my-secret-pw',
        });

        await connection.query('CREATE DATABASE IF NOT EXISTS test;');
        await connection.close();

        const connectionWithMigrations = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'my-secret-pw',
            database: 'test',
            migrations: ['src/migration/*.ts'],
            entities: ['src/entities/*.ts'],
        });
        await connectionWithMigrations.runMigrations({transaction: true}).catch(err => {console.error(err);})
    }
}
