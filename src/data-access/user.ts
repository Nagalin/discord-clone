import { createUserDTO } from '@/dto/user'
import prisma from '@/lib/prisma'

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
            image: image
        },

        update: {}
    })
}

export async function getUserInfoWithId(userId: string) {
    const user = await prisma.user.findFirst({
        where: {
            userId: userId
        }
    })
    return user ? createUserDTO(user) : null
}

export async function getUserInfoWithName(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return user ? createUserDTO(user) : null
}