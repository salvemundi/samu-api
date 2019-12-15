import {MigrationInterface, QueryRunner} from "typeorm";

export class profilePictureUser1576427094536 implements MigrationInterface {
    name = 'profilePictureUser1576427094536'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `user_email_uindex` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `profilePicture` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `profilePicture`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `user_email_uindex` ON `user` (`email`)", undefined);
    }

}
