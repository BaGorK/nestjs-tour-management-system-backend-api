import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432, // Default to 5432 if not set
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || 'localhost',
  database_name: process.env.DATABASE_NAME,
  autoLoadEntities: Boolean(process.env.NODE_ENV === 'development'),
  synchronize:
    process.env.DATABASE_SYNCHRONIZE ??
    Boolean(process.env.NODE_ENV === 'development'),
  rejectUnauthorized: Boolean(process.env.NODE_ENV === 'development'),
}));
