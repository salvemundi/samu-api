import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { Commission } from './entities/commission.entity';
import { Member } from './entities/member.entity';
import { Membership } from './entities/membership.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [Commission, Member, Membership],
    migrations: [path.resolve(__dirname, '../dist/migrations/*.js')],
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export = config;
