import { z } from 'zod'
import { userSchema } from '@/dto/user'

export const privateMessageSchema = z.object({
    privateMessageId: z.string().uuid(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    read: z.boolean(),
    sender: userSchema.optional(),
    recipient: userSchema.optional()
})

type PrivateMessageType = z.infer<typeof privateMessageSchema>

export function createPrivateMessageDTO(privateMessage: PrivateMessageType) {
    return privateMessageSchema.parse(privateMessage)
}