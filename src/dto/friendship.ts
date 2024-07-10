import { z } from 'zod'
import { userSchema } from '@/dto/user'

const friendshipSchema = z.object({
    friendshipId: z.string().uuid(),
    requesterId: z.string(),
    recipientId: z.string(),
    status: z.enum(['Friend', 'Pending']),
    requester: userSchema.optional(),
    recipient: userSchema.optional()
})

type FriendshipType = z.infer<typeof friendshipSchema>

export function createFriendshipDTO(friendship: FriendshipType) {
    return friendshipSchema.parse(friendship)
}