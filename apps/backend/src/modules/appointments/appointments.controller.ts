import { Body, Controller, Get, Post, Route, SuccessResponse } from 'tsoa'
import { Appointment } from './appointments.model'

// Datos Mock iniciales (movidos fuera para persistencia en memoria durante ejecución)
const appointments: Appointment[] = [
  {
    id: '1',
    customerName: 'Carlos Mendoza',
    customerPhone: '+525512345678',
    service: 'Corte de Cabello + Barba',
    date: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    duration: 60,
    status: 'confirmed',
    price: 350,
  },
  {
    id: '2',
    customerName: 'Ana Lucía',
    customerPhone: '+525587654321',
    service: 'Tinte Completo',
    date: new Date(new Date().setHours(12, 30, 0, 0)).toISOString(),
    duration: 120,
    status: 'pending',
    price: 1200,
  },
  {
    id: '3',
    customerName: 'Roberto Garza',
    customerPhone: '+525599887766',
    service: 'Afeitado Clásico',
    date: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
    duration: 30,
    status: 'confirmed',
    price: 200,
  },
  {
    id: '4',
    customerName: 'Luis Miguel',
    customerPhone: '+525511223344',
    service: 'Corte de Niño',
    date: new Date(new Date().setHours(16, 45, 0, 0)).toISOString(),
    duration: 45,
    status: 'cancelled',
    price: 250,
  },
]

type AppointmentCreationParams = Omit<Appointment, 'id' | 'status'>

@Route('appointments')
export class AppointmentsController extends Controller {
  @Get()
  public async getAppointments(): Promise<Appointment[]> {
    return appointments
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createAppointment(
    @Body() requestBody: AppointmentCreationParams
  ): Promise<Appointment> {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...requestBody,
      status: 'pending',
    }
    appointments.push(newAppointment)
    this.setStatus(201) // set return status 201
    return newAppointment
  }
}
