import { Router, Request, Response } from 'express'
import { pool } from '../../models/db'
import bcypt from 'bcrypt'
import { validacionRegister } from '../../routers/validaciones'
import { Register, SAL, UsuarioConsulta, formatError } from '../../types'

export const routerSession = Router()

routerSession.post('/register', async (req: Request, res: Response) => {
  try {
    const vRegistro: Register = validacionRegister.parse(req.body)
    const hashPassword = await bcypt.hash(vRegistro.password, SAL.sal)

    const [usuarioExiste] = await pool.query<UsuarioConsulta[]>(
      'SELECT * FROM usuarios WHERE username = ?',
      [vRegistro.username]
    )

    if (usuarioExiste.length > 0) {
      res.status(404).json({
        message: 'El nombre de usuario ya existe'
      })
      return
    }

    await pool.query('INSERT INTO usuarios (username, password) VALUES (?,?)', [
      vRegistro.username,
      hashPassword
    ])

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
