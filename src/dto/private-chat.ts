import { z } from 'zod'
import { UserSchemaBase } from '@/dto/user'

const PrivateChatSchemaBase = z.object({
    privateChatId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

const PrivateChatWithParticipantsInfoSchema = PrivateChatSchemaBase.extend({
    participants: UserSchemaBase.array()
})

export type PrivateChatType = z.infer<typeof PrivateChatSchemaBase>
export type PrivateChatWithParticipantsInfoType = z.infer<typeof PrivateChatWithParticipantsInfoSchema>

export function createPrivateChatDTO(privateChat: PrivateChatType) {
    return PrivateChatSchemaBase.parse(privateChat)
}

export function createPrivateChatWithParticipantInfoDTO(privateChat: PrivateChatWithParticipantsInfoType, senderId: string) {
    privateChat.participants = privateChat.participants?.filter(curr => curr.userId !== senderId)
    return PrivateChatWithParticipantsInfoSchema.parse(privateChat)
}