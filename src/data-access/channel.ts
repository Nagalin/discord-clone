import prisma from "@/lib/prisma";

export async function createChannel(
    serverId: string, memberId: string, channelName: string, channelType: 'Text' | 'Voice'
) {
    await prisma.channel.create({
        data: {
            serverId: serverId,
            channelName: channelName,
            channelType: channelType,
            members: {
                connect: {
                    userId: memberId
                }
            }
        }
    })
}