import prisma from '@/lib/prisma'
import { createUserDTO } from '@/dto/user'

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

export async function getUserInfoById(userId: string) {
    const user = await prisma.user.findFirst({
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