import { createConnection } from 'typeorm';
import * as path from 'path';

export class DatabaseSeeder {
    public async before() {
        // const connection = await createConnection({
        //     type: 'mysql',
        //     host: process.env.DB_HOST,
        //     port: +process.env.DB_PORT,
        //     username: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     synchronize: false,
        //     extra: { insecureAuth: true },
        // });

        // await connection.query('CREATE DATABASE IF NOT EXISTS testSaMuAPI;');
        // await connection.close();

        const connectionWithMigrations = await createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'testSaMuAPI',
            entities: [path.resolve(__dirname, '../entities', '**/!(*.d).{ts,js}')],
            migrations: [path.resolve(__dirname, '../migrations', '**/!(*.d).{ts,js}')],
            synchronize: false,
            extra: { insecureAuth: true },
        });
        await connectionWithMigrations.runMigrations({transaction: true}).catch(err => {console.error(err);})
    }
}
