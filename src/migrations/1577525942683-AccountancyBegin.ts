import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountancyBegin1577525942683 implements MigrationInterface {
    name = 'AccountancyBegin1577525942683'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `accountancy_payment_method` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `code` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `accountancy_mutation` (`id` int NOT NULL AUTO_INCREMENT, `entryReference` int NOT NULL, `description` varchar(255) NOT NULL, `date` datetime NOT NULL, `amount` int NOT NULL, `debtorIban` varchar(255) NOT NULL, `imported` tinyint NOT NULL, `paymentMethodId` int NULL, `incomeStatementId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `accountancy_income_statement` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_mutation` ADD CONSTRAINT `FK_df784126c7f596daf494ddfaade` FOREIGN KEY (`paymentMethodId`) REFERENCES `accountancy_payment_method`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_mutation` ADD CONSTRAINT `FK_88d7d7957c98caea89bafd9d04b` FOREIGN KEY (`incomeStatementId`) REFERENCES `accountancy_income_statement`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_mutation` DROP FOREIGN KEY `FK_88d7d7957c98caea89bafd9d04b`", undefined);
        await queryRunner.query("ALTER TABLE `accountancy_mutation` DROP FOREIGN KEY `FK_df784126c7f596daf494ddfaade`", undefined);
        await queryRunner.query("DROP TABLE `accountancy_income_statement`", undefined);
        await queryRunner.query("DROP TABLE `accountancy_mutation`", undefined);
        await queryRunner.query("DROP TABLE `accountancy_payment_method`", undefined);
    }

}
