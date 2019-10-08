import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedMemberSinceInMember1570356210812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `memberSince`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `member` ADD `memberSince` datetime NOT NULL", undefined);
    }

}
