import { z } from "zod";

const pendingFriendshipSchema = z.object({
    friendshipId: z.string().uuid(),
    requesterId: z.string(),
    recipientId: z.string(),
    status: z.enum(['Friend', 'Pending'])
})

type PendingFriendshipType = z.infer<typeof pendingFriendshipSchema>
export async function createPendingFriendshipDTO(pendingFriendship: PendingFriendshipType) {
    return pendingFriendshipSchema.parse({
        friendshipId: pendingFriendship.friendshipId,
        requesterId: pendingFriendship.requesterId,
        recipientId: pendingFriendship.recipientId,
        status: pendingFriendship.status
    })
}