export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['src/entity/*.entity.ts'],
    migrations: ['src/migration/*.migration.ts'],
    database: process.env.DB_NAME,
    synchronize: false,
};
