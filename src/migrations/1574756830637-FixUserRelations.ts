import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUserRelations1574756830637 implements MigrationInterface {
    name = 'FixUserRelations1574756830637'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_a82e919c7608211cdfa42c57ff6`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_a82e919c7608211cdfa42c57ff6` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_a82e919c7608211cdfa42c57ff6`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_a82e919c7608211cdfa42c57ff6` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
