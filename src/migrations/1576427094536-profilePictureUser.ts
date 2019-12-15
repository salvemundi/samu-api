import {MigrationInterface, QueryRunner} from "typeorm";

export class profilePictureUser1576427094536 implements MigrationInterface {
    name = 'profilePictureUser1576427094536'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `profilePicture` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `profilePicture`", undefined);
    }

}
