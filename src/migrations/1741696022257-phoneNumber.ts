import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhoneNumber1741696022257 implements MigrationInterface {
  name = 'PhoneNumber1741696022257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "phoneNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_d58b5a97116316c23a3bf507d37" UNIQUE ("phoneNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT '4.5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT 4.5`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_d58b5a97116316c23a3bf507d37"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_f2578043e491921209f5dadd080"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
  }
}
