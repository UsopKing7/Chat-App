import { RowDataPacket } from "mysql2"

// Interface para el Registro
export interface Register {
  username: string
  password: string
}

// Interface para el Login
export interface Login {
  username: string
  password: string
}

// Interface para la consulta de usuarios
export interface UsuarioConsulta extends RowDataPacket{
  id: `${string}-${string}-${string}-${string}-${string}`
  username: string
  password: string
}

interface Sal {
  sal: number
}

export const SAL: Sal = {
  sal: Number(process.env.SAL)
}

// function para los errores
export const formatError = (error: unknown) => ({
  error: error instanceof Error ? error.message : error
})

// interface para el Port del server backedn
interface Port {
  port: number
}

export const PORT: Port = {
  port: Number(process.env.PORT) || 3333
}

// Interface para validar mensajes
export interface Mensaje {
  id_usuario: string,
  contenido: string
}

// Interface para el secret
interface Secret {
  SECRET: string
}

export const SECRET: Secret = {
  SECRET: String(process.env.SECRET)
}

// Interface para Consulta de Mensajes
export interface MensajesConsulta extends RowDataPacket {
  id: `${string}-${string}-${string}-${string}-${string}`
  contenido: string
}

// interface para req.user
export interface UsuarioToken {
  username: string
  id: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: UsuarioToken
    }
  }
}
