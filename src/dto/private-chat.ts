import { z } from 'zod'
import { userSchemaBase } from '@/dto/user'

const privateChatSchema = z.object({
    privateChatId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    participants: userSchemaBase.array().optional()
})

export type PrivateChatType = z.infer<typeof privateChatSchema>

export function createPrivateChatDTO(privateChat: PrivateChatType) {
    return privateChatSchema.parse(privateChat)
}

export function createPrivateChatWithOutSenderInfoDTO(privateChat: PrivateChatType, senderId: string) {
    privateChat.participants = privateChat.participants?.filter(curr => curr.userId !== senderId)
    return createPrivateChatDTO(privateChat)
}