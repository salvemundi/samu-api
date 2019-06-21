export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['/**/*.entity{.ts,.js}'],
    migrations: ['/**/*.migration{.ts,.js}'],
    database: process.env.DB_NAME,
    synchronize: false,
};
