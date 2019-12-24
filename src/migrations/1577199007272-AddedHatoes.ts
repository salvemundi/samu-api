import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedHatoes1577199007272 implements MigrationInterface {
    name = 'AddedHatoes1577199007272'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `hatoes_link` (`id` int NOT NULL AUTO_INCREMENT, `href` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `scopeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `hatoes_link` ADD CONSTRAINT `FK_1cd487add92333732cd2fbb9f50` FOREIGN KEY (`scopeId`) REFERENCES `scope`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `hatoes_link` DROP FOREIGN KEY `FK_1cd487add92333732cd2fbb9f50`", undefined);
        await queryRunner.query("DROP TABLE `hatoes_link`", undefined);
    }

}
