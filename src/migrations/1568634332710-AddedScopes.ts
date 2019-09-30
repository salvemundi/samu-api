import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddedScopes1568634332710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `scope` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `user` ADD `username` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `user` ADD `password` varchar(255) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `password`');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `username`');
        await queryRunner.query('DROP TABLE `scope`');
    }

}
