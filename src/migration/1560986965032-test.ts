import {MigrationInterface, QueryRunner, Table} from 'typeorm';

// tslint:disable-next-line: class-name
export class test1560986965032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'test',
            columns: [
                {
                    name: 'test',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'test2',
                    type: 'varchar',
                    length: '255',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('test');
    }

}
