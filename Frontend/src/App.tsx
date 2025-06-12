// App.tsx
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RutaProtegida } from './routers/RutaProtegida'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'

export const App = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route
        path="/chat/:id_usuario"
        element={
          <RutaProtegida>
            {user && (
              <Chat
                key={user.id}
                id_usuario={user.id}
                username={user.username}
              />
            )}
          </RutaProtegida>
        }
      />
    </Routes>
  )
}
