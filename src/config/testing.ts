import { createConnection, getConnection } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Commission } from 'src/entities/Commission.entity';

export class DatabaseSeeder {
    constructor() {
        dotenv.config();
    }

    public async before() {
        const connection = await createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            synchronize: false,
        });

        await connection.query('CREATE DATABASE IF NOT EXISTS testSaMuAPI;');
        await connection.close();

        const connection2 = await createConnection(this.getConnectionString());
        await connection2.runMigrations({transaction: true}).then(async () => {
            await connection2.close();
        });
    }

    public async after() {
        const connection = await createConnection(this.getConnectionString());
        await connection.dropDatabase();
        await connection.close();
    }

    public getConnectionString(): MysqlConnectionOptions {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            entities: [Commission],
            migrations: [path.resolve(__dirname, '../migrations', '*.ts')],
            database: 'testSaMuAPI',
            synchronize: false,
        };
    }
}
