import { MigrationInterface, QueryRunner } from 'typeorm'

export class makeItPossibleToOrderADwellingSeveralTimes1652343310113 implements MigrationInterface {
  name = 'makeItPossibleToOrderADwellingSeveralTimes1652343310113'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28"')
    await queryRunner.query('ALTER TABLE "order" DROP CONSTRAINT "REL_b931e1a38aa6a1b4337f1c77f2"')
    await queryRunner.query('ALTER TABLE "order" ADD CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28" FOREIGN KEY ("dwelling_id") REFERENCES "dwelling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28"')
    await queryRunner.query('ALTER TABLE "order" ADD CONSTRAINT "REL_b931e1a38aa6a1b4337f1c77f2" UNIQUE ("dwelling_id")')
    await queryRunner.query('ALTER TABLE "order" ADD CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28" FOREIGN KEY ("dwelling_id") REFERENCES "dwelling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }
}
