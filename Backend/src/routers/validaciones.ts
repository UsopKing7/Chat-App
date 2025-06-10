import z from 'zod'

// validacionde Registro de Usuario
export const validacionRegister = z.object({
  username: z
    .string({
      message: 'El username puesto no es valido por que no es un string'
    })
    .min(3, {
      message: 'Error el nombre de usuario debe tener minimo 3 caracteres'
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'El nombre de usuario solo puede tener caracteres validos como mayusculas, minusculas, caracteres especiales y numeros'
    }),
  password: z
    .string({
      message: 'la contraseña no es valida'
    })
    .min(8, {
      message: 'La contraseña tiene que tener como minimo 8 caracteres'
    })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
      message: 'La contraseña contiene caracteres no permitidos'
    })
})
