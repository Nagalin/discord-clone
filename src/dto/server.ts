import { z } from 'zod'

export const serverSchema = z.object({
    serverId: z.string().uuid(),
    serverName: z.string(),
    serverImage: z.string().url(),
    ownerId: z.string()
})

export type ServerType = z.infer<typeof serverSchema>

export function createServerDTO(server: ServerType) {
    return serverSchema.parse(server)
}