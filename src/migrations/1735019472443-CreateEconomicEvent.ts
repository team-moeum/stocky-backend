import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEconomicEvent1735019472443 implements MigrationInterface {
    name = 'CreateEconomicEvent1735019472443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."economic_event_importance_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "economic_event" ("id" SERIAL NOT NULL, "eventDateTime" TIMESTAMP NOT NULL, "country" character varying NOT NULL, "importance" "public"."economic_event_importance_enum" NOT NULL DEFAULT 'MEDIUM', "event" character varying NOT NULL, "actualValue" numeric(10,2), "forecastValue" numeric(10,2), "previousValue" numeric(10,2), "unit" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_76b12b388783a523db03248ddbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9f4af6668b78962e91291863cc" ON "economic_event" ("eventDateTime") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd57c2f6a106f05bdc7f77dbe3" ON "economic_event" ("eventDateTime", "country") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bd57c2f6a106f05bdc7f77dbe3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f4af6668b78962e91291863cc"`);
        await queryRunner.query(`DROP TABLE "economic_event"`);
        await queryRunner.query(`DROP TYPE "public"."economic_event_importance_enum"`);
    }

}
