import {MigrationInterface, QueryRunner} from "typeorm";

export class Teachers1617729936084 implements MigrationInterface {
    name = 'Teachers1617729936084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "middlename" character varying NOT NULL, "character" real NOT NULL, "quality" real NOT NULL, "credits_exams" real NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
