import { z } from 'zod'
import { UserSchemaBase } from '@/dto/user'

const friendshipSchemaBase = z.object({
    friendshipId: z.string().uuid(),
    requesterId: z.string(),
    recipientId: z.string(),
    status: z.enum(['Friend', 'Pending']),
})

const friendshipWithUserInfoSchema = friendshipSchemaBase.extend({
    requester: UserSchemaBase.optional(),
    recipient: UserSchemaBase.optional()
})

type FriendshipWithUserInfoType = Required<z.infer<typeof friendshipWithUserInfoSchema>>
type FriendshipType = z.infer<typeof friendshipSchemaBase>

export function createFriendshipDTO(friendship: FriendshipType) {
    return friendshipSchemaBase.parse(friendship)
}

export function createPendingFriendRequestDTO(
    pendingFriendRequests: FriendshipWithUserInfoType[], userId: string
) {
    return pendingFriendRequests.map(curr => {
        let pendingRequest
        if (curr.requesterId === userId) {
            pendingRequest = {
                friendshipId: curr.friendshipId,
                requesterId: curr.requesterId,
                recipientId: curr.recipientId,
                recipient: curr.recipient,
                status: curr.status
            }
        } else {
            pendingRequest = {
                friendshipId: curr.friendshipId,
                requesterId: curr.requesterId,
                recipientId: curr.recipientId,
                requester: curr.requester,
                status: curr.status
            }
        }
        return friendshipWithUserInfoSchema.parse(pendingRequest)
    })
}