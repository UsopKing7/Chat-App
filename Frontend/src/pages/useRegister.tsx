import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if (res.ok) {
      navigate('/')
    } else {
      alert ('error al crear el usuario')
    }
  }

  const volver = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(-1)
  }

  return { username, setUsername, password, setPassword, handleRegister, volver }
}
