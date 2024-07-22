import { z } from 'zod'

export const UserSchemaBase = z.object({
    userId: z.string(),
    username: z.string(),
    email: z.string().email(),
    image: z.string().url()
})

export type UserType = z.infer<typeof UserSchemaBase>

export function createUserDTO(user: UserType) {
    return UserSchemaBase.parse(user)
}