import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationsTableUserAdressCityState1707937001345
  implements MigrationInterface
{
  name = 'RelationsTableUserAdressCityState1707937001345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "city_state_id_fkey"`,
    );
    await queryRunner.query(
      `CREATE TABLE "adress" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "city_id" integer NOT NULL, "cep" character varying NOT NULL, "complement" character varying NOT NULL, "number" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "adress" ADD CONSTRAINT "FK_25ae8c0c1c11cb0b6da953f6b20" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "adress" ADD CONSTRAINT "FK_f2eb180f4babafbd93f67a4a214" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_37ecd8addf395545dcb0242a593" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_37ecd8addf395545dcb0242a593"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adress" DROP CONSTRAINT "FK_f2eb180f4babafbd93f67a4a214"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adress" DROP CONSTRAINT "FK_25ae8c0c1c11cb0b6da953f6b20"`,
    );
    await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "uf"`);
    await queryRunner.query(
      `ALTER TABLE "state" ADD "uf" character varying(2) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "adress"`);
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
