import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedInfoToIncomeStatement1577616380114 implements MigrationInterface {
    name = 'AddedInfoToIncomeStatement1577616380114'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_income_statement` ADD `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_income_statement` ADD `code` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_income_statement` DROP COLUMN `code`", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_income_statement` DROP COLUMN `name`", undefined);
    }

}
