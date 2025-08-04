import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { 
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT
} = process.env

const poolObj = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT ? Number.parseInt(DB_PORT) : 5432
}

console.log(poolObj)
console.log('Tipo de password:', typeof DB_PASSWORD)

export const pool = new Pool(poolObj)
