import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1568293908801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "member_id",
                    type: "int",
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "middleName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "birthday",
                    type: "datetime",
                },
                {
                    name: "address",
                    type: "varchar",
                },
                {
                    name: "postalCode",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "country",
                    type: "varchar",
                },
                {
                    name: "phoneNumber",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "registeredSince",
                    type: "datetime",
                },
                {
                    name: "pcn",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "member",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "int",
                },
                {
                    name: "memberSince",
                    type: "datetime"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('member');

    }

}
