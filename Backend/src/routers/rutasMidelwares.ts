import { Router } from "express"
import { routerSession } from '../controllers/login-register/session'

export const midelware = Router()

midelware.use('/api', routerSession)