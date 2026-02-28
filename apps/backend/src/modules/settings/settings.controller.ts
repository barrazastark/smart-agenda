import { Body, Controller, Get, Post, Route } from 'tsoa'
import prisma from '../../config/prisma'
import * as Models from './settings.model'

@Route('settings')
export class SettingsController extends Controller {
  @Get()
  public async getSettings(): Promise<Models.AppSettingsResponse> {
    const settings = await prisma.appSettings.findMany()
    const response: Models.AppSettingsResponse = {
      pageTitle: 'Smart Agenda', // Valor por defecto
    }

    settings.forEach((s) => {
      if (s.key === 'pageTitle') response.pageTitle = s.value
    })

    return response
  }

  @Post()
  public async updateSettings(
    @Body() body: Models.UpdateAppSettingsRequest
  ): Promise<Models.AppSettingsResponse> {
    if (body.pageTitle !== undefined) {
      await prisma.appSettings.upsert({
        where: { key: 'pageTitle' },
        update: { value: body.pageTitle },
        create: { key: 'pageTitle', value: body.pageTitle },
      })
    }

    return this.getSettings()
  }
}
