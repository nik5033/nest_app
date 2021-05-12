import {MigrationInterface, QueryRunner} from "typeorm";

export class Teachers1620844950367 implements MigrationInterface {
    name = 'Teachers1620844950367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" ADD "rate_count" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "rate_count"`);
    }

}
