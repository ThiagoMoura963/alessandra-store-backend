import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInUserAdmin1709235370182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public."user"(name, email, password, type_user, phone, cpf)
        VALUES('admin', 'admin@admin.com', '$2b$10$jiRUC90nSOdl4gT/QO.ex.ishT3uoIPh0uBu2n74aPUEVCkKJ/sB2', 2, '11999999999', '32156735672')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.user 
        WHERE email like 'admin@admin.com'
    `);
  }
}
