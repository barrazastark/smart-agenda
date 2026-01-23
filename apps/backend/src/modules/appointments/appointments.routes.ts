import { Router } from 'express'
import { getAppointments, createAppointment } from '../controllers/appointments.controller'

const router: Router = Router()

router.get('/', getAppointments)
router.post('/', createAppointment)

export default router
