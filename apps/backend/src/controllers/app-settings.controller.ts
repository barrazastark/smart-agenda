import { Request, Response } from 'express'
import prisma from '../config/prisma'

export const getAppSettings = async (_req: Request, res: Response) => {
  try {
    const setting = await prisma.appSettings.findUnique({
      where: { key: 'app_title' },
      select: { key: true, value: true },
    })

    if (!setting) {
      return res.status(404).json({ error: 'App title not found' })
    }

    res.json(setting)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch app settings',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const updateAppSettings = async (req: Request, res: Response) => {
  const { value } = req.body

  if (!value) {
    return res.status(400).json({ error: 'Value is required' })
  }

  try {
    const setting = await prisma.appSettings.upsert({
      where: { key: 'app_title' },
      update: { value, updatedAt: new Date() },
      create: { key: 'app_title', value },
    })

    res.json({
      key: setting.key,
      value: setting.value,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update app settings',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
