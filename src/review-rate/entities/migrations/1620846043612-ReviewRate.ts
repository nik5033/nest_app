import {MigrationInterface, QueryRunner} from "typeorm";

export class ReviewRate1620846043612 implements MigrationInterface {
    name = 'ReviewRate1620846043612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb"`);
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_f17e300191624c38c26eb91a2dc"`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_f17e300191624c38c26eb91a2dc" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_f17e300191624c38c26eb91a2dc"`);
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb"`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_f17e300191624c38c26eb91a2dc" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
