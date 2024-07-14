'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPrivateMessagesAction } from './_actions/get-private-messages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useSendMessage from './_hooks/send-message'
import { useParams } from 'next/navigation'
import MessageCard from '@/app/homepage/chat/[userId]/message-card'

type MessagePropsType = {
    privateChatId: string
}
const MessageForm = ({ privateChatId }: MessagePropsType) => {
    const { data: messages, isFetching } = useQuery({
        queryKey: ['private-messages'],
        queryFn: async () => getPrivateMessagesAction({ privateChatId: privateChatId })
    })


    const params = useParams()
    const recipientId = params.userId as string
    const { onSubmit, register } = useSendMessage(privateChatId, recipientId)
    if (isFetching) return
    if (messages?.data?.error) return



    return (
        <form onSubmit={onSubmit}>
            <MessageCard messages={messages?.data?.info!} />
            <Input {...register('message')} required placeholder='Send your messages' />
            <Button className='hidden' />
        </form>
    )
}

export default MessageForm