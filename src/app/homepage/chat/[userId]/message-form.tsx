'use client'

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
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
    const queryClient = useQueryClient()

    const { data: initialMessages, isFetching } = useQuery({
        queryKey: ['private-messages'],
        queryFn: async () => {
            const messages = await getPrivateMessagesAction({
                privateChatId: privateChatId
            })
            await queryClient.invalidateQueries({ queryKey: ['unread-messages'] })
            if (messages?.data?.info)
                useMessageStore.getState().setMessages(messages.data.info)
            console.log('invalidate')


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