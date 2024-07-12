import { z } from 'zod'
import { userSchema } from '@/dto/user'
import  {serverSchema}  from '@/dto/server'

const channelSchemaBase = z.object({
    channelId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice']),
    serverId: z.string().uuid(),
    members: z.array(userSchema).optional()
})

type channelSchemaBaaseType = z.infer<typeof channelSchemaBase> & {
    server?: z.infer<typeof serverSchema> 
}

export const channelSchema: z.Schema<channelSchemaBaaseType> = channelSchemaBase.extend({
    server: serverSchema.optional()
})


export type ChannelType = z.infer<typeof channelSchema>

export function createChannelDTO(channel: ChannelType) {
    return channelSchema.parse(channel)
}
