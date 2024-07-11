import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { UserType } from '@/dto/user'
import { pusherClient } from '@/lib/pusher'
import { useSession } from 'next-auth/react'

type ChannelInfoType = {
    members: { [key: string]: MemberInfoType }
    count: number
    myID: string
    me: MemberType
}

type MemberType = {
    id: string
    info: MemberInfoType
}

type MemberInfoType = {
    username: string
    image: string
}

type PusherContextType = {
    onlineUsers: Omit<UserType, 'email'>[]
    isUserOnline: (userId: string) => boolean
}

const PusherContext = createContext<PusherContextType | undefined>(undefined)

export const usePusherContext = () => {
    const pusherContext = useContext(PusherContext)
    if (!pusherContext) throw new Error('Context is not initiailized')

    return pusherContext
}

type PusherProviderPropsType = {
    children: ReactNode
}

const PusherProvider = ({ children }: PusherProviderPropsType) => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState<Omit<UserType, 'email'>[]>([])
    const { data: session } = useSession()

    const isUserOnline = (userId: string) => {
        return !!onlineUsers.find(currOnlineUser => currOnlineUser.userId === userId)
    }

    useEffect(() => {
        if (!session || isSubscribed) return

        setIsSubscribed(true)

        const presenceChannel = pusherClient.subscribe('presence-online-user')

        presenceChannel.bind('pusher:subscription_succeeded', (channelInfo: ChannelInfoType) => {
            Object.keys(channelInfo.members).forEach(memberId => {
                const member = channelInfo.members[memberId]
                setOnlineUsers(prev => {
                    return [...prev, { ...member, userId: memberId }]
                })

            })
        })

        presenceChannel.bind('pusher:member_added', (newMember: MemberType) => {
            setOnlineUsers(prev => {
                return [...prev, { ...newMember.info, userId: newMember.id }]
            })
        })

        presenceChannel.bind('pusher:member_removed', (member: MemberType) => {
            setOnlineUsers(prev => {
                return prev.filter(user => user.userId !== member.id)
            })
        })

        return () => {
            presenceChannel.unsubscribe()
            presenceChannel.unbind_all()
        }

    }, [])

    return (
        <PusherContext.Provider value={{ onlineUsers, isUserOnline }}>
            {children}
        </PusherContext.Provider>
    )
}

export default PusherProvider