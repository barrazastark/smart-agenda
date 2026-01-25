import { Request, Response } from 'express'
import pool from '../config/database'

export const checkDatabaseConnection = async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    await client.query('SELECT NOW()')
    client.release()

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
