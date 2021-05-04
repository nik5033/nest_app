import {MigrationInterface, QueryRunner} from "typeorm";

export class Reviews1620136902937 implements MigrationInterface {
    name = 'Reviews1620136902937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "pos_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "pos_rate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "neg_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "neg_rate" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "neg_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "neg_rate" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "pos_rate"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "pos_rate" double precision NOT NULL`);
    }

}
