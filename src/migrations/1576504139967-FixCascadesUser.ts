import {MigrationInterface, QueryRunner} from "typeorm";

export class FixCascadesUser1576504139967 implements MigrationInterface {
    name = 'FixCascadesUser1576504139967'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `membership` DROP FOREIGN KEY `FK_eef2d9d9c70cd13bed868afedf4`", undefined);
        await queryRunner.query("ALTER TABLE `membership` ADD CONSTRAINT `FK_eef2d9d9c70cd13bed868afedf4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `membership` DROP FOREIGN KEY `FK_eef2d9d9c70cd13bed868afedf4`", undefined);
        await queryRunner.query("ALTER TABLE `membership` ADD CONSTRAINT `FK_eef2d9d9c70cd13bed868afedf4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
