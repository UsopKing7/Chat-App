import { useRegister } from './useRegister'
import '../styles/Login-Registes.css'

export const Register = () => {
  const { username, handleRegister, password, setPassword, setUsername,volver } =
    useRegister()

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Registro de usuario</h1>
          <p className="login-subtitle">Chat en tiempo real</p>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <input
              type="text"
              className="login-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="input-label">Usuario</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              className="login-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="input-label">Contraseña</label>
          </div>

          <button type="submit" className="login-button">
            <span>Registrar</span>
          </button>
          <button onClick={volver} className="login-button">
            <span>Cancelar</span>
          </button>
        </form>
      </div>
    </div>
  )
}
