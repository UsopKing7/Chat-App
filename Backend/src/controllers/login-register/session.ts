import { Router, Request, Response } from 'express'
import { pool } from '../../models/db'
import { validacionLogin } from '../../routers/validaciones'
import {
  Login,
  SECRET,
  UsuarioConsulta,
  formatError
} from '../../types'
import jwt from 'jsonwebtoken'
import { verificarToken } from '../../routers/cerifitoken'

export const routerSession = Router()

routerSession.post('/login', async (req: Request, res: Response) => {
  try {
    const vLogin: Login = validacionLogin.parse(req.body)
    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE username = $1',
      [vLogin.username]
    )

    let usuario = usuarioExiste[0]

    if (!usuario) {
      const nuevoUsuario = await pool.query(
        'INSERT INTO usuarios (username) VALUES ($1) RETURNING',
        [vLogin.username]
      )

      usuario = nuevoUsuario.rows[0]
      return
    }

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username },
      SECRET.SECRET,
      { expiresIn: '1h' }
    )

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true, // solo true en producción con HTTPS
      sameSite: 'none', // 'lax' para desarrollo
      maxAge: 1000 * 60 * 60 * 2
    })

    res.status(200).json({
      message: 'Login exitoso',
      data: {
        username: usuario.username,
        id: usuario.id
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error al iniciar session',
      error: formatError(error)
    })
  }
})

routerSession.post('/logout', async (_req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  res.status(200).json({ message: 'Session serrada correctamente' })
})
routerSession.get('/me', verificarToken, (req, res) => {
  res.json({ user: req.user })
})
