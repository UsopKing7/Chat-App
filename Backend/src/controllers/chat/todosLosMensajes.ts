import { Router, Request, Response } from 'express'
import { pool } from '../../models/db'
import { formatError, MensajesConsulta } from '../../types'
import { verificarToken } from '../../routers/cerifitoken'

export const routerMensajes = Router()

routerMensajes.get(
  '/mensajes',
  verificarToken,
  async (_req: Request, res: Response) => {
    try {
      const [mensajes] = await pool.query<MensajesConsulta[]>(
        `SELECT mensajes.id_usuario, mensajes.contenido, mensajes.enviado_en, usuarios.username
   FROM mensajes
   JOIN usuarios ON mensajes.id_usuario = usuarios.id
   ORDER BY mensajes.enviado_en ASC`
      )

      if (mensajes.length === 0) {
        res.status(404).json({
          message: 'No se econtraron mensajes en el Chat'
        })
      }

      res.status(200).json(mensajes)
    } catch (error) {
      res.status(500).json({
        message: 'Error al cargar todos los mensajes',
        error: formatError(error)
      })
    }
  }
)
