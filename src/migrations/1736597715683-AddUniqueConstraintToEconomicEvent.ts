import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToEconomicEvent1736597715683 implements MigrationInterface {
    name = 'AddUniqueConstraintToEconomicEvent1736597715683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_187ee9485e744049d3f5ae86be"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b9c2fce5716d3f98ca2fbf2784" ON "economic_event" ("time", "name") `);
        await queryRunner.query(`CREATE INDEX "IDX_187ee9485e744049d3f5ae86be" ON "economic_event" ("time", "country") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_187ee9485e744049d3f5ae86be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9c2fce5716d3f98ca2fbf2784"`);
        await queryRunner.query(`CREATE INDEX "IDX_187ee9485e744049d3f5ae86be" ON "economic_event" ("time", "country") `);
    }

}
