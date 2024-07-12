import { z } from 'zod'
import { userSchema } from '@/dto/user'

const privateChatSchema = z.object({
    privateChatId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    participants: userSchema.array().optional()
})

export type PrivateChatType = z.infer<typeof privateChatSchema>

export function createPrivateChatDTO(privateChat: PrivateChatType) {
    return privateChatSchema.parse(privateChat)
}