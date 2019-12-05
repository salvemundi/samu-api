import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationUserConfirmation1574778610014 implements MigrationInterface {
    name = 'FixRelationUserConfirmation1574778610014'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `confirmation` ADD `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `confirmation` ADD CONSTRAINT `FK_74f1ebea7c18510697c0e2a6be4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `confirmation` DROP FOREIGN KEY `FK_74f1ebea7c18510697c0e2a6be4`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `confirmation` DROP COLUMN `userId`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
