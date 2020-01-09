import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedStartAssetsPaymentMethod1577627927644 implements MigrationInterface {
    name = 'AddedStartAssetsPaymentMethod1577627927644'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` ADD `startAssets` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_payment_method` DROP COLUMN `startAssets`", undefined);
    }

}
