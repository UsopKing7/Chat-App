import { useLogin } from './useLogin'
import '../styles/Login-Registes.css'

interface Props {
  setUser: (user: { id: string; username: string }) => void
}

export const Login = ({ setUser }: Props) => {
  const { username, setUsername, handleLogin: login } = useLogin(setUser)

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">Chat en tiempo real</p>
        </div>

        <form onSubmit={login} className="login-form">
          <div className="input-group">
            <input
              type="text"
              className="login-input"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="input-label">Usuario</label>
          </div>

          <button type="submit" className="login-button">
            <span>Ingresar</span>
          </button>
        </form>
      </div>
    </div>
  )
}
