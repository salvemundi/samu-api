import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedRelationsUserMember1570364572004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `memberId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a82e919c7608211cdfa42c57ff` (`memberId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_a82e919c7608211cdfa42c57ff` ON `user` (`memberId`)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_a82e919c7608211cdfa42c57ff6` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_a82e919c7608211cdfa42c57ff6`", undefined);
        await queryRunner.query("DROP INDEX `REL_a82e919c7608211cdfa42c57ff` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a82e919c7608211cdfa42c57ff`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `memberId`", undefined);
    }

}
