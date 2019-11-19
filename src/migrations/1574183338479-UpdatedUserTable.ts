import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUserTable1574183338479 implements MigrationInterface {
    name = 'UpdatedUserTable1574183338479'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `event` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `signupBefore` datetime NOT NULL, `memberOnly` tinyint NOT NULL, `memberPrice` int NOT NULL, `notMemberPrice` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `event`", undefined);
    }

}
