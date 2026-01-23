/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Appointment = {
  id: string
  customerName: string
  customerPhone: string
  service: string
  date: string
  duration: number
  status: Appointment.status
  price: number
}
export namespace Appointment {
  export enum status {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
  }
}
