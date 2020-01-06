import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [path.resolve(__dirname, 'entities/**/*.entity.ts')],
    migrations: [path.resolve(__dirname, 'migrations/*.ts')],
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'scr/entities',
    },
};
