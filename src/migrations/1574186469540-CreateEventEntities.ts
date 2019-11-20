import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEventEntities1574186469540 implements MigrationInterface {
    name = 'CreateEventEntities1574186469540'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `event_signup` (`id` int NOT NULL AUTO_INCREMENT, `cancelled` tinyint NOT NULL DEFAULT 0, `userId` int NULL, `eventId` int NULL, `transactionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `event` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `signupBefore` datetime NOT NULL, `memberOnly` tinyint NOT NULL, `memberPrice` int NOT NULL, `notMemberPrice` int NOT NULL, `createdById` int NULL, `committeeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` ADD CONSTRAINT `FK_b6563c59d0924242dbfadc20aa4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` ADD CONSTRAINT `FK_dec8d870a207da455a3d4b38658` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` ADD CONSTRAINT `FK_8c745a6eccccdc9778901783565` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `event` ADD CONSTRAINT `FK_1d5a6b5f38273d74f192ae552a6` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `event` ADD CONSTRAINT `FK_1fa0e96fc21776fa240dc1b9a49` FOREIGN KEY (`committeeId`) REFERENCES `committee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `event` DROP FOREIGN KEY `FK_1fa0e96fc21776fa240dc1b9a49`", undefined);
        await queryRunner.query("ALTER TABLE `event` DROP FOREIGN KEY `FK_1d5a6b5f38273d74f192ae552a6`", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` DROP FOREIGN KEY `FK_8c745a6eccccdc9778901783565`", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` DROP FOREIGN KEY `FK_dec8d870a207da455a3d4b38658`", undefined);
        await queryRunner.query("ALTER TABLE `event_signup` DROP FOREIGN KEY `FK_b6563c59d0924242dbfadc20aa4`", undefined);
        await queryRunner.query("DROP TABLE `event`", undefined);
        await queryRunner.query("DROP TABLE `event_signup`", undefined);
    }

}
