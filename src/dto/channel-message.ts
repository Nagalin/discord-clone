import { z } from 'zod'
import { channelSchema } from './channel'
import { userSchemaBase } from './user'

const channelMessageSchema = z.object({
    channelMessageId: z.string().uuid(),
    sender: userSchemaBase.optional(),
    senderId: z.string(),
    content: z.string(),
    channel: channelSchema.optional(),
    channelId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type ChannelMessageType = z.infer<typeof channelMessageSchema>