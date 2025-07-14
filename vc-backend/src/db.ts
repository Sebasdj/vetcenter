import { Pool } from 'pg';
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '4112002',
  port: 5432,
});
