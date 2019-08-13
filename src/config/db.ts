import * as path from 'path';

export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [path.resolve(__dirname, '../entities', '*.ts')],
    migrations: [path.resolve(__dirname, '../migrations', '*.ts')],
    database: process.env.DB_NAME,
    synchronize: false,
};
