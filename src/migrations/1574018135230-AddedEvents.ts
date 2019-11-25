import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AddedEvents1574018135230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "event",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "64",
                    isUnique: true
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "creatorId",
                    type: "int"
                },
                {
                    name: "committeeId",
                    type: "int"
                },
                {
                    name: "startDate",
                    type: "datetime"
                },
                {
                    name: "endDate",
                    type: "datetime"
                },
                {
                    name: "signupBefore",
                    type: "datetime"
                },
                {
                    name: "memberOnly",
                    type: "tinyint"
                },
                {
                    name: "memberPrice",
                    type: "int"
                },
                {
                    name: "notMemberPrice",
                    type: "int"
                }
            ], foreignKeys: [
                new TableForeignKey({
                    name: "FK_EVENTCREATOR",
                    referencedTableName: "user",
                    referencedColumnNames: ["id"],
                    columnNames: ["creatorId"]
                }),
                new TableForeignKey({
                    name: "FK_EVENTCOMMITTEE",
                    referencedTableName: "committee",
                    referencedColumnNames: ["id"],
                    columnNames: ["committeeId"]
                })
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("event", "FK_EVENTCOMMITTEE");
        await queryRunner.dropForeignKey("event", "FK_EVENTCREATOR");
        await queryRunner.dropTable("event");
    }

}
