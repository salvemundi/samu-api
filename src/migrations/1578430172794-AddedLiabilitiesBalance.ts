import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedLiabilitiesBalance1578430172794 implements MigrationInterface {
    name = 'AddedLiabilitiesBalance1578430172794'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` ADD `startLiabilities` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` CHANGE `startAssets` `startAssets` int NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` CHANGE `startAssets` `startAssets` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` DROP COLUMN `startLiabilities`", undefined);
    }

}
