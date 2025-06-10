import { Router } from 'express'
import { routerSession } from '../controllers/login-register/session'
import { routerVerify } from '../controllers/login-register/rutatoken'
import { routerMensajes } from '../controllers/chat/todosLosMensajes'

export const midelware = Router()

midelware.use('/api', routerSession)
midelware.use('/api', routerVerify)
midelware.use('/api', routerMensajes)
