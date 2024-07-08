import z from 'zod'

export const userSchema = z.object({
    userId: z.string(),
    username: z.string(),
    email: z.string().email(),
    image: z.string().url()
})

export type UserType = z.infer<typeof userSchema>

export function createUserDTO(user: UserType) {
    return userSchema.parse({
        userId: user.userId,
        username: user.username,
        email: user.email,
        image: user.image
    })
}
