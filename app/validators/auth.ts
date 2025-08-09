import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
