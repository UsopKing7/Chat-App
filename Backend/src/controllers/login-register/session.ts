import { Router, Request, Response } from 'express'
import { pool } from '../../models/db'
import bcrypt from 'bcrypt'
import { validacionLogin, validacionRegister } from '../../routers/validaciones'
import {
  Login,
  Register,
  SAL,
  SECRET,
  UsuarioConsulta,
  formatError
} from '../../types'
import jwt from 'jsonwebtoken'
import { verificarToken } from '../../routers/cerifitoken'

export const routerSession = Router()

routerSession.post('/register', async (req: Request, res: Response) => {
  try {
    const vRegistro: Register = validacionRegister.parse(req.body)
    const hashPassword = await bcrypt.hash(vRegistro.password, SAL.sal)

    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE username = $1',
      [vRegistro.username]
    )

    if (usuarioExiste.length > 0) {
      res.status(404).json({
        message: 'El nombre de usuario ya existe'
      })
      return
    }

    await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1,$2)',
      [vRegistro.username, hashPassword]
    )

    res.status(201).json({
      message: 'Usuario creado correctamente'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el usuario',
      error: formatError(error)
    })
  }
})

routerSession.post('/login', async (req: Request, res: Response) => {
  try {
    const vLogin: Login = validacionLogin.parse(req.body)
    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE username = $1',
      [vLogin.username]
    )

    if (usuarioExiste.length === 0) {
      res.status(404).json({
        message: 'El nombre de usuario no existe'
      })
      return
    }

    const usuario = usuarioExiste[0]

    const verificarPassword = await bcrypt.compare(
      vLogin.password,
      usuario.password
    )

    if (!verificarPassword) {
      res.status(404).json({
        message: 'La contraseña o usuario incorrectos'
      })
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
