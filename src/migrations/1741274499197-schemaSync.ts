import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1741274499197 implements MigrationInterface {
  name = 'SchemaSync1741274499197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT '4.5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT 4.5`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
