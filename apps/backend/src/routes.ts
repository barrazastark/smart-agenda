/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime'
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppointmentsController } from './modules/appointments/appointments.controller'
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express'

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Appointment: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      customerName: { dataType: 'string', required: true },
      customerPhone: { dataType: 'string', required: true },
      service: { dataType: 'string', required: true },
      date: { dataType: 'string', required: true },
      duration: { dataType: 'double', required: true },
      status: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['pending'] },
          { dataType: 'enum', enums: ['confirmed'] },
          { dataType: 'enum', enums: ['cancelled'] },
        ],
        required: true,
      },
      price: { dataType: 'double', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Appointment.Exclude_keyofAppointment.id-or-status__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        customerName: { dataType: 'string', required: true },
        customerPhone: { dataType: 'string', required: true },
        service: { dataType: 'string', required: true },
        date: { dataType: 'string', required: true },
        duration: { dataType: 'double', required: true },
        price: { dataType: 'double', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Appointment.id-or-status_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Appointment.Exclude_keyofAppointment.id-or-status__', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AppointmentCreationParams: {
    dataType: 'refAlias',
    type: { ref: 'Omit_Appointment.id-or-status_', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true,
})

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsAppointmentsController_getAppointments: Record<string, TsoaRoute.ParameterSchema> = {}
  app.get(
    '/appointments',
    ...fetchMiddlewares<RequestHandler>(AppointmentsController),
    ...fetchMiddlewares<RequestHandler>(AppointmentsController.prototype.getAppointments),

    async function AppointmentsController_getAppointments(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = []
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAppointmentsController_getAppointments,
          request,
          response,
        })

        const controller = new AppointmentsController()

        await templateService.apiHandler({
          methodName: 'getAppointments',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        })
      } catch (err) {
        return next(err)
      }
    }
  )
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAppointmentsController_createAppointment: Record<string, TsoaRoute.ParameterSchema> = {
    requestBody: {
      in: 'body',
      name: 'requestBody',
      required: true,
      ref: 'AppointmentCreationParams',
    },
  }
  app.post(
    '/appointments',
    ...fetchMiddlewares<RequestHandler>(AppointmentsController),
    ...fetchMiddlewares<RequestHandler>(AppointmentsController.prototype.createAppointment),

    async function AppointmentsController_createAppointment(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = []
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsAppointmentsController_createAppointment,
          request,
          response,
        })

        const controller = new AppointmentsController()

        await templateService.apiHandler({
          methodName: 'createAppointment',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        })
      } catch (err) {
        return next(err)
      }
    }
  )
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
