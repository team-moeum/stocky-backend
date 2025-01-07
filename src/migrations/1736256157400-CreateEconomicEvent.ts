import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEconomicEvent1736256157400 implements MigrationInterface {
    name = 'CreateEconomicEvent1736256157400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."economic_event_impact_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TABLE "economic_event" ("id" SERIAL NOT NULL, "time" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "impact" "public"."economic_event_impact_enum" NOT NULL DEFAULT 'low', "actual" numeric(10,2), "estimate" numeric(10,2), "previous" numeric(10,2), "unit" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_76b12b388783a523db03248ddbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cdd6202ce7e84a69bed2bd890a" ON "economic_event" ("time") `);
        await queryRunner.query(`CREATE INDEX "IDX_187ee9485e744049d3f5ae86be" ON "economic_event" ("time", "country") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_187ee9485e744049d3f5ae86be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdd6202ce7e84a69bed2bd890a"`);
        await queryRunner.query(`DROP TABLE "economic_event"`);
        await queryRunner.query(`DROP TYPE "public"."economic_event_impact_enum"`);
    }

}
