import { useLogin } from './useLogin'

export const Login = () => {
  const { handleLogin, password, setPassword, setUsername, username } =
    useLogin()
  return (
    <>
      <h1>Login de session</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="usuario">Nickname</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="usuario">password</label>
        <input
          type="text"
          placeholder="username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">iniciar session</button>
        <button>reegistrarse</button>
      </form>
    </>
  )
}
