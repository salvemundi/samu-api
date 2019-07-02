import { createConnection } from 'typeorm';

export class DatabaseSeeder {
    public async before() {
        const connection = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'my-secret-pw',
            migrations: ['./../migration/*.js'],
        });

        connection.query('CREATE DATABSE test IF NOT EXISTS;');
        connection.query('USE test;');
        await connection.runMigrations({transaction: true});
    }
}
