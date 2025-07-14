import { Pool } from 'pg';
export const pool = new Pool({
  user: 'sebasra',
  host: 'localhost',
  database: 'vetcenter',
  password: 'sebasra@user',
  port: 5432,
});
