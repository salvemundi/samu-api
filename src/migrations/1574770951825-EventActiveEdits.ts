import {MigrationInterface, QueryRunner} from "typeorm";

export class EventActiveEdits1574770951825 implements MigrationInterface {
    name = 'EventActiveEdits1574770951825'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `event` ADD `active` tinyint NOT NULL DEFAULT 1", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `event` DROP COLUMN `active`", undefined);
    }

}
