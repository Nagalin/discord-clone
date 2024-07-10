import { pusherClient } from '@/lib/pusher'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { createContext, ReactNode, useEffect, useState } from 'react'


type PusherContextType = {

}

const PusherContext = createContext<PusherContextType | undefined>(undefined)

type PusherProviderPropsType = {
    children: ReactNode
}
const PusherProvider = ({ children }: PusherProviderPropsType) => {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isSubscribed, setIsSubscribed] = useState(false)

    useEffect(() => {
        if (!session || isSubscribed) return

        setIsSubscribed(true)
        const presenceChannel = pusherClient.subscribe('presence-user')

        presenceChannel.bind("pusher:subscription_succeeded", (members) => {
            console.log(members)
        })
    }, [pathname])

    return (
        <div>{children}</div>
    )
}

export default PusherProvider