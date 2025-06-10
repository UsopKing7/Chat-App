import { Routes, Route } from 'react-router-dom'
import { RutaProtegida } from './routers/RutaProtegida'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'

export const App = () => {
const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/chat/:id_usuario"
        element={
          <RutaProtegida>
            <Chat id_usuario={user.id} username={user.username} />
          </RutaProtegida>
        }
      />
    </Routes>
  )
}
