'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRecipientAction } from './_actions/get-recipient'
import UserCard from '@/components/user-card'
import { usePusherContext } from '@/contexts/pusher-provider'

type RecipientCardPropsType = {
    privateChatId: string
}

const RecipientCard = ({privateChatId}: RecipientCardPropsType) => {
    const { data: recipient, isFetching } = useQuery({
        queryKey: ['recipient'],
        queryFn: async () => getRecipientAction({ privateChatId: privateChatId })
    })
    const { isUserOnline } = usePusherContext()

    if (isFetching) return

    const online = isUserOnline(recipient?.data?.info.userId!)
    return (
        <div className=' flex items-center border-b-2 border-black pb-3  mt-2 p-2'>
        <UserCard online={online} user={recipient?.data?.info!} />
    </div>
    )
}

export default RecipientCard