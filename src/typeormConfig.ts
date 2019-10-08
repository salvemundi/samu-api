import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [ path.resolve(__dirname, 'entities/**.entity.*') ],
    migrations: [ path.resolve(__dirname, 'migrations/*.*') ],
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entities',
    },
};

export = config;
