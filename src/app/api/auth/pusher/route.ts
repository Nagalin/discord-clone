import { PresenceChannelData, UserChannelData } from 'pusher'
import { authConfigs } from '@/lib/authConfigs'
import { pusherServer } from '@/lib/pusher'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const data = await req.text()
        const [socketId, channelName] = data
            .split("&")
            .map(str => str.split("=")[1])

        const session = await getServerSession(authConfigs)
        if (!session) return NextResponse.json('Unauthorized user', { status: 403 })

        const { userId, name, email, image } = session?.user

        const userData: PresenceChannelData = {
            user_id: userId,
            user_info: {
                name: name,
                email: email,
                image: image
            }
        }

        console.log('channelname: ',channelName)

        const authResponse = pusherServer.authorizeChannel(socketId, channelName, userData)

        console.log('here')
        return NextResponse.json(authResponse)
    } catch (error) {
        console.error(error)
        return NextResponse.json('Error occurs', { status: 500 })
    }
}
