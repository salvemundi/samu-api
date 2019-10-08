import {MigrationInterface, QueryRunner} from "typeorm";

export class Payments1570524900570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_a82e919c7608211cdfa42c57ff` ON `user`", undefined);
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `status` int NOT NULL, `amount` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `transaction_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `transaction`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a82e919c7608211cdfa42c57ff` ON `user` (`memberId`)", undefined);
    }

}
