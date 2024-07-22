import { z } from 'zod'


const ChannelMessageSchemaBase = z.object({
    channelMessageId: z.string().uuid(),
    senderId: z.string(),
    content: z.string(),
    channelId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type ChannelMessageType = z.infer<typeof ChannelMessageSchemaBase>