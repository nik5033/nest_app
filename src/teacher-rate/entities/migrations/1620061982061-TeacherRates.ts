import {MigrationInterface, QueryRunner} from "typeorm";

export class TeacherRates1620061982061 implements MigrationInterface {
    name = 'TeacherRates1620061982061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_8554ca4826231daa07720e5e0d5"`);
        await queryRunner.query(`CREATE TABLE "teacher-rate" ("id" SERIAL NOT NULL, "character" real NOT NULL, "quality" real NOT NULL, "credits_exams" real NOT NULL, "user_id" integer, "teacher_id" integer, CONSTRAINT "PK_f0f47e2530fedd1021f419dba26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_7167df2d4229b34cdead7a4d661" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_aba06b83a4af359883e918359ec" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_aba06b83a4af359883e918359ec"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_7167df2d4229b34cdead7a4d661"`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "teacher_id" integer`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "user_id" integer`);
        await queryRunner.query(`DROP TABLE "teacher-rate"`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_8554ca4826231daa07720e5e0d5" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
