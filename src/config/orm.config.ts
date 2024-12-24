import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: 5432,
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrationsRun: false,
  migrations: [__dirname + '/../migrations/*.js'],
  migrationsTableName: 'migrations',
});
