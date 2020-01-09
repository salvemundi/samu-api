import {MigrationInterface, QueryRunner} from "typeorm";

export class MutationImportDefaultValue1577632885147 implements MigrationInterface {
    name = 'MutationImportDefaultValue1577632885147'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_mutation` CHANGE `imported` `imported` tinyint NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `accountancy_mutation` CHANGE `imported` `imported` tinyint NOT NULL", undefined);
    }

}
