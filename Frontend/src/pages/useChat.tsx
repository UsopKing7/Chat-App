import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface Mensaje {
  id_usuario: string
  contenido: string
}

export const useChat = (id_usuario: string) => {
  const [mensajes, setMensaje] = useState<Mensaje[]>([])
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io('http://localhost:3333', {
      query: { id_usuario }
    })

    socketRef.current.on('chat:mensaje', (mensaje: Mensaje) => {
      setMensaje((prev) => [...prev, mensaje])
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [id_usuario])

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/mensajes', {
          method: 'GET',
          credentials: 'include'
        })

        if (!res.ok) throw new Error('Error en la respuesta')
        const data = await res.json()
        setMensaje(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMensajes()
  }, [])

  const enviarMensaje = (contenido: string) => {
    if (!contenido.trim()) return
    const nuevoMensaje: Mensaje = { id_usuario, contenido }
    socketRef.current?.emit('chat:mensaje', nuevoMensaje)
  }

  return { mensajes, enviarMensaje }
}
