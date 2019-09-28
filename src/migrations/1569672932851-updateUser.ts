import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1569672932851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `middleName`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `pcn`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `pcn` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `pcn`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `pcn` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `middleName` varchar(255) NULL", undefined);
    }

}
