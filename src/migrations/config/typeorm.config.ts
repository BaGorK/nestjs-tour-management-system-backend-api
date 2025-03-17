import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  ssl:
    process.env.NODE_ENV === 'development'
      ? { rejectUnauthorized: true }
      : false,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
