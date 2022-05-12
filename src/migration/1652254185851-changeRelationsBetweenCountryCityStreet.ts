import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationsBetweenCountryCityStreet1652254185851 implements MigrationInterface {
    name = 'changeRelationsBetweenCountryCityStreet1652254185851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dwelling" DROP CONSTRAINT "FK_50c7ec1231329ef329a433af4c6"`);
        await queryRunner.query(`ALTER TABLE "dwelling" DROP CONSTRAINT "FK_3fa35cb444b8658e70d21708906"`);
        await queryRunner.query(`ALTER TABLE "dwelling" DROP COLUMN "country_id"`);
        await queryRunner.query(`ALTER TABLE "dwelling" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "city" ADD "country_id" integer`);
        await queryRunner.query(`ALTER TABLE "street" ADD "city_id" integer`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_08af2eeb576770524fa05e26f39" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "street" ADD CONSTRAINT "FK_9ceb9e1132ab366b2cc26659a34" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "street" DROP CONSTRAINT "FK_9ceb9e1132ab366b2cc26659a34"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_08af2eeb576770524fa05e26f39"`);
        await queryRunner.query(`ALTER TABLE "street" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "country_id"`);
        await queryRunner.query(`ALTER TABLE "dwelling" ADD "city_id" integer`);
        await queryRunner.query(`ALTER TABLE "dwelling" ADD "country_id" integer`);
        await queryRunner.query(`ALTER TABLE "dwelling" ADD CONSTRAINT "FK_3fa35cb444b8658e70d21708906" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dwelling" ADD CONSTRAINT "FK_50c7ec1231329ef329a433af4c6" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
