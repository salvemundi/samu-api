import {MigrationInterface, QueryRunner} from "typeorm";

export class ReworkAuth1568720364355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL");
    }

}
