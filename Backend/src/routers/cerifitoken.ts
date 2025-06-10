import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET, UsuarioToken } from '../types'

export const verificarToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) {
    res.status(404).json({ message: 'Token no encontrado' })
    return
  }

  try {
    const decoded = jwt.verify(token, SECRET.SECRET) as UsuarioToken
    req.user = decoded
    next()
  } catch (error) {
    console.error('❌ Token inválido:', error)
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}
