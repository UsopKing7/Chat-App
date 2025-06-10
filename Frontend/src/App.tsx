import { Routes, Route } from 'react-router-dom'
import { RutaProtegida } from './routers/RutaProtegida'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/chat/:id_usuario"
        element={
          <RutaProtegida>
            <Chat />
          </RutaProtegida>
        }
      />
    </Routes>
  )
}
