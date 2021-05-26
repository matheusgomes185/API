import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateChallenges1621507592153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "challenges",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar", 
                    },
                    {
                        name: "amount",
                        type: "float"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("challenges");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
