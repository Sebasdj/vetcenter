import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { 
  USER,
  USER_PASSWORD,
  DATABASE,
  HOST,
  PORT
} = process.env

const poolObj = {
  user: USER,
  host: HOST,
  database: DATABASE,
  password: USER_PASSWORD,
  port: PORT ? Number.parseInt(PORT) : 5432
}

console.log(poolObj)

export const pool = new Pool(poolObj);
