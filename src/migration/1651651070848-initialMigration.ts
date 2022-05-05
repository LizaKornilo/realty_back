import { ConfigService } from '@nestjs/config';
import { Roles } from './../role/roles-values.enum';
import { MigrationInterface, QueryRunner } from "typeorm";
const bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from 'uuid';

export class initialMigration1651651070848 implements MigrationInterface {
    name = 'initialMigration1651651070848'

    admin = {
        username: "administrator",
        email: "liza.kor142001@gmail.com",
        password: bcrypt.hashSync("iamadmin", 5),
        activationKey: uuidv4(),
        is_activated: true,
        role_id: 3,
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "activationKey" character varying NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "role_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_1221b7d38114ef372c0130c4401" UNIQUE ("activationKey"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_fbbecbf5974405cb19dbd2f2434" UNIQUE ("value"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dwelling" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "image_path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "owner_id" integer, CONSTRAINT "PK_72a0d7c880cb8b31eca1612d1b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "user_id" integer, "dwelling_id" integer, CONSTRAINT "REL_b931e1a38aa6a1b4337f1c77f2" UNIQUE ("dwelling_id"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dwelling_tag" ("dwelling_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_a401051703a83f6e6c7b296bb66" PRIMARY KEY ("dwelling_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c82582111cbb3cdf04d9d40717" ON "dwelling_tag" ("dwelling_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b933a48a6fb36678b8b6055f7" ON "dwelling_tag" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dwelling" ADD CONSTRAINT "FK_eab9e8118c391a3569757b29a55" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28" FOREIGN KEY ("dwelling_id") REFERENCES "dwelling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dwelling_tag" ADD CONSTRAINT "FK_c82582111cbb3cdf04d9d407176" FOREIGN KEY ("dwelling_id") REFERENCES "dwelling"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dwelling_tag" ADD CONSTRAINT "FK_3b933a48a6fb36678b8b6055f75" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO role (value) VALUES ('${Roles.USER}')`);
        await queryRunner.query(`INSERT INTO role (value) VALUES ('${Roles.OWNER}')`);
        await queryRunner.query(`INSERT INTO role (value) VALUES ('${Roles.ADMIN}')`);
        await queryRunner.query(`INSERT INTO "user" (username, email, password, "activationKey", is_activated, role_id)
        VALUES ('${this.admin.username}', '${this.admin.email}', '${this.admin.password}', '${this.admin.activationKey}', '${this.admin.is_activated}', '${this.admin.role_id}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dwelling_tag" DROP CONSTRAINT "FK_3b933a48a6fb36678b8b6055f75"`);
        await queryRunner.query(`ALTER TABLE "dwelling_tag" DROP CONSTRAINT "FK_c82582111cbb3cdf04d9d407176"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_b931e1a38aa6a1b4337f1c77f28"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "dwelling" DROP CONSTRAINT "FK_eab9e8118c391a3569757b29a55"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b933a48a6fb36678b8b6055f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c82582111cbb3cdf04d9d40717"`);
        await queryRunner.query(`DROP TABLE "dwelling_tag"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "dwelling"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
