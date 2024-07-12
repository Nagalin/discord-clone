import { z } from 'zod'
import { createUserDTO, userSchema } from '@/dto/user'

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

export function createUserFriendDTO(friendship: FriendshipType[], userId: string) {
    return friendship.map(currFriend => {
        const isRequester = currFriend.requesterId === userId
        return isRequester ?
            createUserDTO(currFriend.recipient!) : createUserDTO(currFriend.requester!)
    })
}

export function createPendingFriendRequestDTO(pendingFriendRequests: FriendshipType[], requesterId: string) {
    return pendingFriendRequests.map(curr => {
        const friendshipDTO = createFriendshipDTO(curr)
        curr.requesterId === requesterId ?
            delete friendshipDTO.requester :
            delete friendshipDTO.recipient

        return friendshipDTO
    })
}