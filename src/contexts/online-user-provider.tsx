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
    getUserOnlineNum: () => number
}

const OnlineUserContext = createContext<PusherContextType | undefined>(undefined)

export const useOnlineUserContext = () => {
    const context = useContext(OnlineUserContext)
    if (!context) throw new Error('Context is not initiailized')

    return context
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

    const getUserOnlineNum = () => onlineUsers.length - 1

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
        <OnlineUserContext.Provider value={{ onlineUsers, isUserOnline, getUserOnlineNum }}>
            {children}
        </OnlineUserContext.Provider>
    )
}

export default PusherProvider