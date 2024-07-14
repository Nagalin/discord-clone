'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRecipientAction } from './_actions/get-recipient'
import UserCard from '@/components/user-card'

type RecipientCardPropsType = {
    privateChatId: string
}

const RecipientCard = ({ privateChatId }: RecipientCardPropsType) => {
    const { data: recipient, isFetching } = useQuery({
        queryKey: ['recipient'],
        queryFn: async () => getRecipientAction({ privateChatId: privateChatId })
    })

    if (isFetching) return

    return (
        <div className=' flex items-center border-b-2 border-black pb-3  mt-2 p-2'>
            <UserCard user={recipient?.data?.info!} />
        </div>
    )
}

export default RecipientCard