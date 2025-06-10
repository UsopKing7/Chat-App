import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import { midelware } from './routers/rutasMidelwares'
import { PORT } from './types'
import cors from 'cors'
import { pool } from './models/db'
import { guardarMensaje } from './controllers/chat/message'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json())

const server = http.createServer(app)

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

app.use(midelware)

io.on('connection', async (socket) => {
  const id_usuario = socket.handshake.query.id_usuario as string

  if (!id_usuario) {
    console.log('Conexion sin id_usuario, desconectando...')
    socket.disconnect()
    return
  }

  console.log(`Usuario conectado ${socket.id} (usuario: ${id_usuario})`)

  try {
    const [result] = await pool.query(
      'INSERT INTO sesiones (id_usuario) VALUES (?)',
      [id_usuario]
    )

    const id_sesion = (result as any).insertId
    socket.data.id_sesion = id_sesion
  } catch (error) {
    console.log('Error guardando session:', error)
  }

  socket.on('chat:mensage', (msj) => {
    io.emit('chat:mensaje', msj)
  })

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado ${socket.id}`)
  })

  socket.on('chat:mensaje', async (msj) => {
    try {
      await guardarMensaje(msj.id_usuario, msj.id_contenido)
      io.emit('chat:mensaje', msj)
    } catch (error) {
      console.log('Error guardando mensaje:', error)
    }
  })

  socket.on('disconnect', async () => {
    console.log(`Usuario desconectado: ${socket.id} (Usuario: ${id_usuario})`)
    try {
      await pool.query(
        'UPDATE sesiones SET desconectado_en = CURRENT_TIMESTAMP WHERE ID = ?',
        [socket.data.id_sesion]
      )
    } catch (error) {
      console.log('Error actualizando sesion:', error)
    }
  })
})

server.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    url: `http://0.0.0.0:${PORT.port}`,
    websocket: true
  })
})
