'use client'

import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getPrivateMessagesAction } from './_actions/get-private-messages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useSendMessage from './_hooks/send-message'
import MessageCard from '@/app/homepage/chat/[userId]/message-card'
import { useMessageStore } from './_zustand/messages-store'

type MessagePropsType = {
    privateChatId: string
    recipientId: string
}
const MessageForm = ({ privateChatId, recipientId }: MessagePropsType) => {

    const { data: initialMessages, isFetching } = useQuery({
        queryKey: ['private-messages'],
        queryFn: async () => {
            const messages = await getPrivateMessagesAction({
                privateChatId: privateChatId
            })
            if (messages?.data?.info)
                useMessageStore.getState().setMessages(messages.data.info)
            return messages
        }
    })

    const { onSubmit, register } = useSendMessage(privateChatId, recipientId)

    if (isFetching) return
    if (initialMessages?.data?.error) return


    return (
        <form onSubmit={onSubmit}>
            <MessageCard />
            <Input {...register('message')} required placeholder='Send your messages' />
            <Button className='hidden' />
        </form>
    )
}

export default MessageForm