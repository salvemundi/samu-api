import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedRelationTransaction1574774702212 implements MigrationInterface {
    name = 'FixedRelationTransaction1574774702212'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_605baeb040ff0fae995404cea37`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
