CREATE DATABASE IF NOT EXISTS chat_app;
use chat_app;

-- Tabla usuarios
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nickname VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla mensajes
CREATE TABLE mensajes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  id_usuario CHAR(36) NOT NULL,
  contenido TEXT NOT NULL,
  enviado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla para para ver sessiones. Ej: online o offine
CREATE TABLE sesiones (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  id_usuario VARCHAR(36) NOT NULL,
  conectado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  desconectado_en DATETIME,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
