import { Router } from "express"
import { routerSession } from '../controllers/login-register/session'
import { routerVerify } from "../controllers/login-register/rutatoken"

export const midelware = Router()

midelware.use('/api', routerSession)
midelware.use('/api', routerVerify)