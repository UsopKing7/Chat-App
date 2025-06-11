import { Pool } from 'pg'
import env from 'dotenv'
import pc from 'picocolors'

env.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})


const verificarConeccion = async () => {
  const dbname = process.env.DB_NAME
  try {
    const connection = await pool.connect()
    console.log( pc.blue(`[+] conneccion a la base de datos completa "${dbname}"`))
    connection.release()
  } catch (error) {
    throw new Error(`[-] Error al conectarse a la base de datos ${dbname}: ${error}`)
  }
}

verificarConeccion()