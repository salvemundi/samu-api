import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [path.resolve(__dirname, '../entities', '*.ts')],
    // entities: [Commission],
    migrations: [path.resolve(__dirname, '../migrations', '*.ts')],
    database: 'testSaMuAPI',
    synchronize: false,
};
