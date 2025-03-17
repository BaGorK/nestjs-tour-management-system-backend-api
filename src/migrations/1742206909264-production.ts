import { MigrationInterface, QueryRunner } from 'typeorm';

export class Production1742206909264 implements MigrationInterface {
  name = 'Production1742206909264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT '4.5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tour" ALTER COLUMN "ratingsAverage" SET DEFAULT 4.5`,
    );
  }
}
