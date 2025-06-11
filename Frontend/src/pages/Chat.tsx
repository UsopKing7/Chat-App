import { useState } from 'react'
import { useChat } from './useChat'

interface Props {
  id_usuario: string
  username: string
}

export const Chat = ({ id_usuario, username }: Props) => {
  const { mensajes, enviarMensaje } = useChat(id_usuario, username)
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    enviarMensaje(input)
    setInput('')
  }

  return (
    <div>
      <h2>Chat - Bienvenido {username}</h2>

      <div
        style={{
          height: 300,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10
        }}
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            style={{
              backgroundColor:
                m.id_usuario === id_usuario ? '#daf8cb' : '#f1f0f0',
              marginBottom: 8,
              padding: 6,
              borderRadius: 4
            }}
          >
            <strong>{m.id_usuario === id_usuario ? 'Tú' : m.username}:</strong>{' '}
            {m.contenido}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: '80%', padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 5 }}>
          Enviar
        </button>
      </form>
    </div>
  )
}
