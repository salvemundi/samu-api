import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedMemberStructure1575564861294 implements MigrationInterface {
    name = 'RemovedMemberStructure1575564861294'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `membership` DROP FOREIGN KEY `FK_3b4b41597707b13086e71727422`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_a82e919c7608211cdfa42c57ff6`", undefined);
        await queryRunner.query("DROP INDEX `REL_a82e919c7608211cdfa42c57ff` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `membership` CHANGE `memberId` `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `memberId`", undefined);
        await queryRunner.query("ALTER TABLE `membership` ADD CONSTRAINT `FK_eef2d9d9c70cd13bed868afedf4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP TABLE `member`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `member` (`id` int NOT NULL AUTO_INCREMENT, `memberSince` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `membership` DROP FOREIGN KEY `FK_eef2d9d9c70cd13bed868afedf4`", undefined);
        await queryRunner.query("ALTER TABLE `event` ADD `active` tinyint NOT NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `memberId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `membership` CHANGE `userId` `memberId` int NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_a82e919c7608211cdfa42c57ff` ON `user` (`memberId`)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_a82e919c7608211cdfa42c57ff6` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `membership` ADD CONSTRAINT `FK_3b4b41597707b13086e71727422` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
