import { createConnection, DatabaseType } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import testdb from './testdb';

export class DatabaseSeeder {
    public async before() {
        console.log(testdb as MysqlConnectionOptions)
        // First we need a connection without a db, in order to create a db
        const connection = await createConnection({
            type: 'mysql',
            host: testdb.host,
            port: testdb.port,
            username: testdb.username,
            password: testdb.password,
            synchronize: testdb.synchronize,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${testdb.database};`);
        await connection.close();

        // Now we run the migrations on the db and fill the db with clean data, but we need a new connection for that
        const connection2 = await createConnection(testdb as MysqlConnectionOptions);
        await connection2.runMigrations({transaction: true}).then(async () => {
            await connection2.close();
        });
    }

    public async after() {
        // At last we drop the db, so the next tests will run with the clean data
        const connection = await createConnection(testdb as MysqlConnectionOptions);
        await connection.dropDatabase();
        await connection.close();
    }
}
