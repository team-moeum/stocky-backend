import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
