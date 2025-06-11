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

const whitelist = [
  'http://localhost:5173',
  'https://chat-app-ochre-zeta.vercel.app'
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

const io = new Server(server, {
  cors: {
    origin: whitelist,
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
    const { rows: result } = await pool.query(
      'INSERT INTO sesiones (id_usuario) VALUES ($1)',
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
      await guardarMensaje(msj.id_usuario, msj.contenido)
      io.emit('chat:mensaje', msj)
    } catch (error) {
      console.log('Error guardando mensaje:', error)
    }
  })

  socket.on('disconnect', async () => {
    console.log(`Usuario desconectado: ${socket.id} (Usuario: ${id_usuario})`)
    try {
      await pool.query(
        'UPDATE sesiones SET desconectado_en = CURRENT_TIMESTAMP WHERE ID = $1',
        [socket.data.id_sesion]
      )
    } catch (error) {
      console.log('Error actualizando sesion:', error)
    }
  })
})

server.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    url: `http://0.0.0.0:${PORT}`,
    websocket: true
  })
})
