import { z } from 'zod'
import { UserSchemaBase } from '@/dto/user'

const ChannelMessageSchemaBase = z.object({
    channelMessageId: z.string().uuid(),
    senderId: z.string(),
    content: z.string(),
    channelId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

const ChannelMessageWithSenderInfoSchema = ChannelMessageSchemaBase.extend({
    sender: UserSchemaBase
})

export type ChannelMessageType = z.infer<typeof ChannelMessageSchemaBase>
export type ChannelMessageWithSenderInfoType = z.infer<typeof ChannelMessageWithSenderInfoSchema>


export function createChannelMessageWithSenderInfoDTO(channelMessage: ChannelMessageWithSenderInfoType) {
    return ChannelMessageWithSenderInfoSchema.parse(channelMessage)
}