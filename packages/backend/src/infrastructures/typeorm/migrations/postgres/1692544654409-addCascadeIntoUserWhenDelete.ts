import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeIntoUserWhenDelete1692544654409 implements MigrationInterface {
    name = 'AddCascadeIntoUserWhenDelete1692544654409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
