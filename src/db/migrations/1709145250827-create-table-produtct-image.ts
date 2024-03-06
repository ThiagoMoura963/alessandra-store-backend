import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductImage1709145250827
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.product_image (
            id integer NOT NULL,
            product_id integer NOT NULL,
            url character varying NOT NULL,
            primary key (id),
            foreign key (product_id) references public.product(id)
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        );
                    
        CREATE SEQUENCE public.product_image_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                    
        ALTER SEQUENCE public.product_image_id_seq OWNED BY public.product_image.id;
                    
        ALTER TABLE ONLY public.product_image ALTER COLUMN id SET DEFAULT nextval('public.product_image_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.product_image;
    `);
  }
}
