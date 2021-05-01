import {MigrationInterface, QueryRunner} from "typeorm";

export class Reviews1619888674738 implements MigrationInterface {
    name = 'Reviews1619888674738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "text" character varying(400) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "pos_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "pos_rate" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "neg_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "neg_rate" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "neg_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "neg_rate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "pos_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "pos_rate" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
