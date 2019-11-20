import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUser1574249542398 implements MigrationInterface {
    name = 'FixUser1574249542398'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("CREATE TABLE `confirmation` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `activated` tinyint NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `activated`", undefined);
        await queryRunner.query("DROP TABLE `confirmation`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`, `userId`) REFERENCES `user`(`id`,`id`) ON DELETE CASCADE ON UPDATE RESTRICT", undefined);
    }

}
