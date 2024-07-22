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

export async function getUserInfoByName(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return user ? createUserDTO(user) : null
}

export async function getFriends(userId: string) {
    const friends = await prisma.user.findMany({
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
    return friends.map(currFriend => createUserDTO(currFriend))
}

export async function getChannelMembers(channelId: string) {
    const channelMembers = await prisma.user.findMany({
        where: {
            channelMembers: {
                some: {
                    channelId: channelId
                }
            }
        }
    })
    return channelMembers.map(currChannelMembers => createUserDTO(currChannelMembers))
}

export async function getAvailableMembers(serverId: string, channelId: string) {
    const availableMembers = await prisma.user.findMany({
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
    return availableMembers.map(currAvailableMembers => createUserDTO(currAvailableMembers))
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