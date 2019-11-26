import {MigrationInterface, QueryRunner} from "typeorm";

export class removedTransactionId1574773480343 implements MigrationInterface {
    name = 'removedTransactionId1574773480343'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP COLUMN `transaction_id`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` ADD `transaction_id` int NOT NULL", undefined);
    }

}
