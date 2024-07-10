import PusherClient from 'pusher-js'
import PusherServer from 'pusher'

const pusherClientKey = process.env. NEXT_PUBLIC_PUSHER_CLIENT_KEY
const pusherServerAppId = process.env.NEXT_PUBLIC_PUSHER_SERVER_APP_ID
const pusherServerKey = process.env.NEXT_PUBLIC_PUSHER_SERVER_KEY
const pusherServerSecret = process.env.NEXT_PUBLIC_PUSHER_SERVER_SECRET

if (!pusherClientKey) throw new Error('Missing PUSHER_CLIENT_KEY')
if(!pusherServerAppId)  throw new Error('Missing PUSHER_SERVER_APP_ID')
if(!pusherServerKey) throw new Error('Missing PUSHER_SERVER_KEY')
if(!pusherServerSecret) throw new Error('Missing PUSHER_SERVER_SECRET')


export const pusherServer = new PusherServer({
    appId: pusherServerAppId,
    key: pusherServerKey,
    secret: pusherServerSecret,
    cluster: 'ap1',
    useTLS: true
})

export const pusherClient = new PusherClient(pusherClientKey, {
    cluster: 'ap1',
    channelAuthorization: {
        endpoint: '/api/auth/pusher',
        transport: 'ajax'
    }
})