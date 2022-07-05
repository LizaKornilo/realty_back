import { MigrationInterface, QueryRunner } from 'typeorm'

export class makeStreetAndCityValuesNotUnique1652265343531 implements MigrationInterface {
  name = 'makeStreetAndCityValuesNotUnique1652265343531'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "street" DROP CONSTRAINT "UQ_b330d820da8cb1d2dca9ced1e0f"')
    await queryRunner.query('ALTER TABLE "city" DROP CONSTRAINT "UQ_1eaf5ea4b986bd59a5b7abaeff8"')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "city" ADD CONSTRAINT "UQ_1eaf5ea4b986bd59a5b7abaeff8" UNIQUE ("value")')
    await queryRunner.query('ALTER TABLE "street" ADD CONSTRAINT "UQ_b330d820da8cb1d2dca9ced1e0f" UNIQUE ("value")')
  }
}
