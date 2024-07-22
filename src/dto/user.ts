import { z } from 'zod'

export const userSchemaBase = z.object({
    userId: z.string(),
    username: z.string(),
    email: z.string().email(),
    image: z.string().url()
})

export type UserType = z.infer<typeof userSchemaBase>

export function createUserDTO(user: UserType) {
    return userSchemaBase.parse(user)
}