import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTable1708378806049 implements MigrationInterface {
    name = 'AddTable1708378806049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salaryfits"."bees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_ee6e511e6510730dcbe1135ab48" UNIQUE ("name"), CONSTRAINT "PK_55f58d084353862cab56218172a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salaryfits"."bees"`);
    }

}
