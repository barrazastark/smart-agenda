import { Request, Response } from 'express'
import pool from '../config/database'

export const getAppSettings = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT key, value FROM app_settings WHERE key = $1', [
      'app_title',
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'App title not found' })
    }

    res.json({
      key: result.rows[0].key,
      value: result.rows[0].value,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch app settings',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
