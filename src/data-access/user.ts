import prisma from '@/lib/prisma'
import { createUserDTO } from '@/dto/user'

export async function getUserInfoById(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    })
    return user ? createUserDTO(user) : null
}

export async function upsertUser(
    userId: string, username: string, email: string, image: string
) {
    await prisma.user.upsert({
        where: {
            userId: userId
        },

        create: {
            userId: userId,
            username: username,
            email: email,
            image: image,
        },

        update: {}
    })
}

export async function getFriends(userId: string) {
    return await prisma.user.findMany({
        where: {
            OR: [
                {
                    sendFriendRequestTo: {
                        some: {
                            recipientId: userId,
                            status: 'Friend'
                        }
                    }

                },

                {
                    recievedFriendRequestFrom: {
                        some: {
                            requesterId: userId,
                            status: 'Friend'
                        },
                    }

                }
            ]

        }
    })
}

export async function getUserInfoByName(username: string) {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
    })
}

export async function getChannelMembers(channelId: string) {
    return await prisma.user.findMany({
        where: {
            channelMembers: {
                some: {
                    channelId: channelId
                }
            }
        }
    })
}

export async function getAvailableMembers(serverId: string, channelId: string) {
    return await prisma.user.findMany({
        where: {
            serverMembers: {
                some: {
                    serverId: serverId
                }
            },
            NOT: {
                channelMembers: {
                    some: {
                        channelId: channelId
                    }
                }
            }
        }
    })
}