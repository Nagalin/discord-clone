import { z } from 'zod'
import { userSchemaBase } from '@/dto/user'

const friendshipSchemaBase = z.object({
    friendshipId: z.string().uuid(),
    requesterId: z.string(),
    recipientId: z.string(),
    status: z.enum(['Friend', 'Pending']),
})

const friendshipWithUserInfoDTOSchema = friendshipSchemaBase.extend({
    requester: userSchemaBase.optional(),
    recipient: userSchemaBase.optional()
})

type FriendshipWithUserInfoType = Required<z.infer<typeof friendshipWithUserInfoDTOSchema>>
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
        return friendshipWithUserInfoDTOSchema.parse(pendingRequest)
    })
}