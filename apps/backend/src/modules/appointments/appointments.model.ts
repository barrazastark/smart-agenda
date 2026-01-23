export interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  service: string
  date: string // ISO String
  duration: number // minutos
  status: 'pending' | 'confirmed' | 'cancelled'
  price: number
}
