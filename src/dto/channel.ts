import { z } from 'zod'
import { serverSchema } from '@/dto/server'
import { userSchema } from "@/dto/user"

const channelSchema = z.object({
    channelId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice']),
    serverId: z.string().uuid(),
    server: serverSchema.optional(),
    members: z.array(userSchema).optional()
})

export type ChannelType = z.infer<typeof channelSchema>

export function createChannelDTO(channel: ChannelType) {
    return channelSchema.parse(channel)
}