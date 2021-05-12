import {MigrationInterface, QueryRunner} from "typeorm";

export class TeacherRate1620845567289 implements MigrationInterface {
    name = 'TeacherRate1620845567289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_7167df2d4229b34cdead7a4d661"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_aba06b83a4af359883e918359ec"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_7167df2d4229b34cdead7a4d661" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_aba06b83a4af359883e918359ec" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_aba06b83a4af359883e918359ec"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" DROP CONSTRAINT "FK_7167df2d4229b34cdead7a4d661"`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_aba06b83a4af359883e918359ec" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher-rate" ADD CONSTRAINT "FK_7167df2d4229b34cdead7a4d661" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
