# Chat-App

## Descripción

Chat-App es una aplicación de chat en tiempo real desarrollada con React (frontend) y Node.js (backend). No utiliza librerías externas para la funcionalidad principal del chat, lo que permite apreciar las habilidades de desarrollo puro y manejo de tecnologías básicas.

Esta aplicación soporta múltiples usuarios sin necesidad de registro vía correo electrónico. Es responsiva, intuitiva y cuenta con una base de datos para persistencia de mensajes y usuarios.

---

## Características

- Chat en tiempo real para múltiples usuarios.
- Login simple sin correo, basado en nickname.
- Guardado de mensajes en base de datos para historial.
- Interfaz responsiva para dispositivos móviles y escritorio.
- Estilo limpio y moderno.
- Comunicación en tiempo real usando WebSocket (Socket.IO).
- Sin dependencia de librerías externas para el chat.

---

## Tecnologías usadas

- **Frontend:** React + Vite + TypeScript, CSS puro.
- **Backend:** Node.js, Express, TypeScript, Socket.IO.
- **Base de datos:** PostgreSQL.
- **Herramientas:** Vite, VsCode, IA.

---

## Instalación y uso local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/UsopKing7/Chat-App.git
   cd Chat-App
   ```

2. Instala dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

3. Instala dependencias del frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Ejecuta el backend:

   ```bash
   cd ../backend
   npm run tsc && npm run dev
   ```

5. Ejecuta el frontend:

   ```bash
   cd ../frontend
   npm run dev
   ```

6. Abre en tu navegador `http://localhost:5173` (o el puerto que indique Vite).

---

## Estructura del proyecto

```
Chat-App/
├── backend/          # Código backend (Node.js + Express + Socket.IO)
├── frontend/         # Código frontend (React)
├── README.md         # Este archivo
└── ...
```

---

## Funcionalidades futuras sugeridas

* Mejoras en seguridad y autenticación.
* Notificaciones de mensajes nuevos.
* Soporte para múltiples salas o canales.
* Modo claro.
* Paginación o carga dinámica de historial.
* Validaciones y sanitización de inputs.

---

## Autor

**Nicolás (UsopKing7)**


---
## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, puedes seguir estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio 
3. Realiza tus cambios y haz commit de ellos 
4. Sube tus cambios a tu fork 
5. Abre un pull request desde tu fork hacia el repositorio original.

## Soporte

Si tienes problemas al utilizar este script o tienes preguntas, no dudes en abrir un **issue** en el repositorio. Nos esforzamos por responder lo antes posible y ayudar a resolver cualquier inconveniente.

## Agradecimientos

Gracias por utilizar este proyecto. Si lo encuentras útil, ¡no dudes en dejar una estrella ⭐ en GitHub!
