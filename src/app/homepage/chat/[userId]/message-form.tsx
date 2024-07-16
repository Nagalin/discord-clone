'use client'

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPrivateMessagesAction } from '@/app/homepage/chat/[userId]/_actions/get-private-messages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useSendMessage from '@/app/homepage/chat/[userId]/_hooks/use-send-message'
import MessageCard from '@/app/homepage/chat/[userId]/message-card'
import { useMessageStore } from '@/app/homepage/chat/[userId]/_zustand/messages-store'

type MessagePropsType = {
    privateChatId: string
    recipientId: string
}

const MessageForm = ({ privateChatId, recipientId }: MessagePropsType) => {
    const queryClient = useQueryClient()
    const setMessages = useMessageStore(state => state.setMessages)

    const { data: initialMessages, isFetching } = useQuery({
        queryKey: ['private-messages'],
        queryFn: async () => {
            const messages = await getPrivateMessagesAction({
                privateChatId: privateChatId
            })
            await queryClient.invalidateQueries({ queryKey: ['unread-messages'] })
            if (messages?.data?.info) setMessages(messages.data.info)

            return messages
        }
    })

    const { onSubmit, register } = useSendMessage(privateChatId, recipientId)

    if (isFetching) return <div>waitttt</div>
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