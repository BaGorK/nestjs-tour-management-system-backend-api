import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaffsEntity1741327713483 implements MigrationInterface {
  name = 'StaffsEntity1741327713483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."staff_role_enum" AS ENUM('admin', 'guide', 'lead-guide')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "profilePicture" character varying, "role" "public"."staff_role_enum" NOT NULL DEFAULT 'guide', CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT '4.5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT 4.5`,
    );
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TYPE "public"."staff_role_enum"`);
  }
}
