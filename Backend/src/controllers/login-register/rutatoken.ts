import { Router } from 'express'
import { verificarToken  } from '../../routers/cerifitoken'

export const routerVerify = Router()

routerVerify.get('/verificar-token', verificarToken, (req, res) => {
  res.status(200).json({ user: req.user })
})
