import {MigrationInterface, QueryRunner} from "typeorm";

export class ReviewRateMigration1620122455917 implements MigrationInterface {
    name = 'ReviewRateMigration1620122455917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review-rate" ("id" SERIAL NOT NULL, "rate" integer NOT NULL, "user_id" integer, "review_id" integer, CONSTRAINT "PK_63cbd672cf143127e33c33c7235" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review-rate" ADD CONSTRAINT "FK_f17e300191624c38c26eb91a2dc" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_f17e300191624c38c26eb91a2dc"`);
        await queryRunner.query(`ALTER TABLE "review-rate" DROP CONSTRAINT "FK_2ec31a07ded5d047d4fd38496cb"`);
        await queryRunner.query(`DROP TABLE "review-rate"`);
    }

}
