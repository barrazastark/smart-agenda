import pool from './database'
import fs from 'fs'
import path from 'path'

export const initializeDatabase = async () => {
  console.log('START [Backend] Initializing database...')
  try {
    const migrationPath = path.join(__dirname, '../../migrations/001_create_app_settings.sql')
    const sql = fs.readFileSync(migrationPath, 'utf8')

    await pool.query(sql)
    console.log('SUCCESS [Backend] Database initialized successfully')
  } catch (error) {
    console.error('ERROR [Backend] Failed to initialize database:', error)
  }
}
