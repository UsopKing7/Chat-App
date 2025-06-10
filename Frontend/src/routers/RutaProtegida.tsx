// RutaProtegida.tsx
import { Navigate } from 'react-router-dom'
import { useAuthStatus } from '../pages/useLogin'

export const RutaProtegida = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStatus()

  if (isLoading) return <div>Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/" replace />

  return <>{children}</>
}
