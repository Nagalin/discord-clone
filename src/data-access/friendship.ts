import { createFriendshipDTO } from '@/dto/friendship';
import prisma from "@/lib/prisma";

export async function createFriendship(requesterId: string, recipientId: string) {
    await prisma.friendship.create({
        data: {
            requesterId: requesterId,
            recipientId: recipientId,
            status: 'Pending'
        }
    })
}

export async function getFriendship(
    requesterId: string, recipientId: string,
) {
    const friendship = await prisma.friendship.findFirst({
        where: {
            OR: [
                {
                    requesterId: requesterId,
                    recipientId: recipientId,
                },
                {
                    requesterId: recipientId,
                    recipientId: recipientId
                }
            ]
        },
    })

    return friendship ? createFriendshipDTO(friendship) : null
}

export async function getPendingFriendship(requesterId: string) {
    const pendingFriendRequests = await prisma.friendship.findMany({
        where: {
            OR: [{
                requesterId: requesterId,
            }, {
                recipientId: requesterId
            }],
            status: 'Pending'
        },
        include: {
            requester: true,
            recipient: true
        }
    })
    return pendingFriendRequests.map(curr => {
        const friendshipDTO = createFriendshipDTO(curr)
        curr.requesterId === requesterId ?
            delete friendshipDTO.requester :
            delete friendshipDTO.recipient

        return friendshipDTO
    })
}

export async function acceptFriendRequest(
    friendshipId: string, requesterId: string, recipientId: string
) {
    await prisma.friendship.update({
        where: {
            friendshipId: friendshipId,
            requesterId: requesterId,
            recipientId: recipientId,
            status: 'Pending'
        },
        
        data: {
            status: 'Friend'
        }
    })
}
export async function deleteFriendship(friendshipId: string, requesterId: string, recipientId: string) {
    await prisma.friendship.delete({
        where: {
            friendshipId: friendshipId,
            requesterId: requesterId,
            recipientId: recipientId,
            status: 'Pending'
        }
    })
}