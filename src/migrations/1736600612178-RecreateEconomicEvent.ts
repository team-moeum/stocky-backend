import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateEconomicEvent1736600612178 implements MigrationInterface {
    name = 'RecreateEconomicEvent1736600612178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_cdd6202ce7e84a69bed2bd890a" ON "economic_event" ("time") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b9c2fce5716d3f98ca2fbf2784" ON "economic_event" ("time", "name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b9c2fce5716d3f98ca2fbf2784"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdd6202ce7e84a69bed2bd890a"`);
    }

}
