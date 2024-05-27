import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsActive1716630745488 implements MigrationInterface {
    name = 'UserIsActive1716630745488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
