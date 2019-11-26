import {MigrationInterface, QueryRunner} from "typeorm";

export class CommitteeMembers1574778015961 implements MigrationInterface {
    name = 'CommitteeMembers1574778015961'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `committee_member` (`id` int NOT NULL AUTO_INCREMENT, `profile` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `committeeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `committee_member` ADD CONSTRAINT `FK_d5394bf15be712347beb12c11ec` FOREIGN KEY (`committeeId`) REFERENCES `committee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `committee_member` DROP FOREIGN KEY `FK_d5394bf15be712347beb12c11ec`", undefined);
        await queryRunner.query("DROP TABLE `committee_member`", undefined);
    }

}
