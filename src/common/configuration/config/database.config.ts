import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || 'localhost',
  database_name: process.env.DATABASE_NAME,
  autoLoadEntities: Boolean(process.env.NODE_ENV === 'development'),
  synchronize:
    process.env.DATABASE_SYNCHRONIZE ??
    Boolean(process.env.NODE_ENV === 'development'),
  rejectUnauthorized: Boolean(process.env.NODE_ENV === 'production'),
}));
