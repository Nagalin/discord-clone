import { createPendingFriendshipDTO } from "@/dto/friendship";
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
            requesterId: requesterId,
            recipientId: recipientId,
        }
    })

    return friendship ? createPendingFriendshipDTO(friendship) : null
}