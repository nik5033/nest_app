import {MigrationInterface, QueryRunner} from "typeorm";

export class TeacherRates1620061375152 implements MigrationInterface {
    name = 'TeacherRates1620061375152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "middlename"`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "surname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "middlename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "teacher_id" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_8554ca4826231daa07720e5e0d5" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_8554ca4826231daa07720e5e0d5"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "middlename"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "middlename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "surname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "name" character varying NOT NULL`);
    }

}
