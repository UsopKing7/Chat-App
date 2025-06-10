import { Router } from "express"
import { routerSession } from '../controllers/login-register/login'

export const midelware = Router()

midelware.use('/api', routerSession)