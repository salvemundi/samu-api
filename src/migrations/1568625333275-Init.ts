import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1568625333275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `membership` (`id` int NOT NULL AUTO_INCREMENT, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `memberId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `middleName` varchar(255) NULL, `lastName` varchar(255) NOT NULL, `birthday` datetime NOT NULL, `address` varchar(255) NOT NULL, `postalcode` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `registeredSince` datetime NOT NULL, `pcn` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `member` (`id` int NOT NULL AUTO_INCREMENT, `memberSince` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `membership` ADD CONSTRAINT `FK_3b4b41597707b13086e71727422` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `membership` DROP FOREIGN KEY `FK_3b4b41597707b13086e71727422`");
        await queryRunner.query("DROP TABLE `member`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `membership`");
        await queryRunner.query("DROP TABLE `commission`");
    }

}
