import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = (
  setUser: (user: { id: string; username: string }) => void
) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.data))
      setUser(data.data)
      navigate(`/chat/${data.data.id}`)
    } else {
      alert(data.message + ' Error al iniciar sesión')
    }
  }

  return { setUsername, setPassword, username, password, handleLogin }
}

// Hook separado para el estado de autenticación
export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/verificar-token', {
          method: 'GET',
          credentials: 'include'
        })

        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuthenticated, isLoading }
}
