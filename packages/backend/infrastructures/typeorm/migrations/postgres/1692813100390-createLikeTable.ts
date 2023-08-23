import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikeTable1692813100390 implements MigrationInterface {
    name = 'CreateLikeTable1692813100390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "post_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD "likesId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_e9416fda5a158a33fb19c400f1f" FOREIGN KEY ("likesId") REFERENCES "like"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_d41caa70371e578e2a4791a88ae" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_d41caa70371e578e2a4791a88ae"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_e9416fda5a158a33fb19c400f1f"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likesId"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
