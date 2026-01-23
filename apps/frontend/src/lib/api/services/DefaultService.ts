/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Appointment } from '../models/Appointment'
import type { AppointmentCreationParams } from '../models/AppointmentCreationParams'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class DefaultService {
  /**
   * @returns Appointment Ok
   * @throws ApiError
   */
  public static getAppointments(): CancelablePromise<Array<Appointment>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/appointments',
    })
  }
  /**
   * @param requestBody
   * @returns Appointment Created
   * @throws ApiError
   */
  public static createAppointment(
    requestBody: AppointmentCreationParams
  ): CancelablePromise<Appointment> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/appointments',
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
