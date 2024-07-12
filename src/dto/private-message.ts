import { z } from 'zod'

export const privateMessage = z.object({
    privateMessageId: z.string().uuid(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})