import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from './useChat'
import { FiSend, FiLogOut } from 'react-icons/fi'
import '../styles/chat.css'

interface Props {
  id_usuario: string
  username: string
}

export const Chat = ({ id_usuario, username }: Props) => {
  const { mensajes, enviarMensaje } = useChat(id_usuario, username)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  useEffect(() => {
    scrollToBottom('auto')
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    enviarMensaje(input)
    setInput('')
  }

  const handleLogout = async () => {
    const res = await fetch('https://chat-app-cl4v.onrender.com/api/logout', {
      method: 'POST',
      credentials: 'include'
    })

    if (res.ok) {
      navigate('/')
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-content">
          <h2 className="chat-title">Chat en vivo</h2>
          <div className="user-controls">
            <span className="username-badge">
              <svg className="user-icon" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {username}
            </span>
            <button onClick={handleLogout} className="logout-button" title="Cerrar sesión">
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="messages-container" ref={messagesContainerRef}>
        <div className="messages-scroll">
          {mensajes.map((m, i) => (
            <div 
              key={i}
              className={`message ${m.id_usuario === id_usuario ? 'own-message' : 'other-message'}`}
            >
              <div className="message-content">
                <span className="message-username">
                  {m.id_usuario === id_usuario ? 'Tú' : m.username}
                </span>
                <span className="message-text">{m.contenido}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-group">
          <input
            type="text"
            className="message-input"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-button" title="Enviar mensaje">
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}
