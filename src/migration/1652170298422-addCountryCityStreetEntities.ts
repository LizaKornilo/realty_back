import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCountryCityStreetEntities1652170298422 implements MigrationInterface {
  name = 'addCountryCityStreetEntities1652170298422'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "street" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_b330d820da8cb1d2dca9ced1e0f" UNIQUE ("value"), CONSTRAINT "PK_5629a676c74c04f5845b964469c" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "country" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_2f99322fc86c9432f3ec9713af7" UNIQUE ("value"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "city" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_1eaf5ea4b986bd59a5b7abaeff8" UNIQUE ("value"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "dwelling" ADD "country_id" integer')
    await queryRunner.query('ALTER TABLE "dwelling" ADD "city_id" integer')
    await queryRunner.query('ALTER TABLE "dwelling" ADD "street_id" integer')
    await queryRunner.query('ALTER TABLE "dwelling" ADD CONSTRAINT "FK_50c7ec1231329ef329a433af4c6" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "dwelling" ADD CONSTRAINT "FK_3fa35cb444b8658e70d21708906" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "dwelling" ADD CONSTRAINT "FK_1d26eb8ea3c8e3c0880b452cb2c" FOREIGN KEY ("street_id") REFERENCES "street"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "dwelling" DROP CONSTRAINT "FK_1d26eb8ea3c8e3c0880b452cb2c"')
    await queryRunner.query('ALTER TABLE "dwelling" DROP CONSTRAINT "FK_3fa35cb444b8658e70d21708906"')
    await queryRunner.query('ALTER TABLE "dwelling" DROP CONSTRAINT "FK_50c7ec1231329ef329a433af4c6"')
    await queryRunner.query('ALTER TABLE "dwelling" DROP COLUMN "street_id"')
    await queryRunner.query('ALTER TABLE "dwelling" DROP COLUMN "city_id"')
    await queryRunner.query('ALTER TABLE "dwelling" DROP COLUMN "country_id"')
    await queryRunner.query('DROP TABLE "city"')
    await queryRunner.query('DROP TABLE "country"')
    await queryRunner.query('DROP TABLE "street"')
  }
}
