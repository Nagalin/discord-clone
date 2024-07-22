import prisma from '@/lib/prisma'
import { getServerMember } from '@/data-access/server'
import { getFriends } from '@/data-access/user'
import { 
    createFriendshipDTO, 
    createPendingFriendRequestDTO, 
} from '@/dto/friendship'

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
                    recipientId: requesterId
                }
            ]
        },
    })
    return friendship ? createFriendshipDTO(friendship) : null
}

export async function getPendingFriendship(userId: string) {
    const pendingFriendRequests = await prisma.friendship.findMany({
        where: {
            OR: [
                {
                    requesterId: userId,
                },
                {
                    recipientId: userId
                }],
            status: 'Pending'
        },

        include: {
            requester: true,
            recipient: true
        }
    })
    return createPendingFriendRequestDTO(pendingFriendRequests, userId)
}

export async function getAvailableFriends(serverId: string, ownerId: string) {
    const friends = await getFriends(ownerId)
    const server = await getServerMember(serverId)

    const availableFriends = friends.filter(currFriend => {
        return !server?.members.some(currMember => currMember.userId === currFriend.userId)
    })

    return availableFriends
}

export async function updateFriendship(
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

export async function deleteFriendship(
    friendshipId: string, requesterId: string, recipientId: string
) {
    await prisma.friendship.delete({
        where: {
            friendshipId: friendshipId,
            requesterId: requesterId,
            recipientId: recipientId,
            status: 'Pending'
        }
    })
}