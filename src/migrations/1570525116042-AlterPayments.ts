import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPayments1570525116042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` CHANGE `amount` `price` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD `price` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD `price` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` CHANGE `price` `amount` varchar(255) NOT NULL", undefined);
    }

}
