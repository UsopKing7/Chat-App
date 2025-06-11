import { pool } from '../../models/db'
import { formatError, Mensaje } from '../../types'
import { validacionMensajes } from '../../routers/validaciones'

export const guardarMensaje = async (id_usuario: string, contenido: string) => {
  try {
    const vMensaje: Mensaje = await validacionMensajes.parseAsync({
      id_usuario,
      contenido
    })
    await pool.query(
      'INSERT INTO mensajes (id_usuario, contenido) VALUES ($1,$2)',
      [vMensaje.id_usuario, vMensaje.contenido]
    )
  } catch (error) {
    const errMsg = formatError(error)
    console.log(errMsg)
    throw error
  }
}
