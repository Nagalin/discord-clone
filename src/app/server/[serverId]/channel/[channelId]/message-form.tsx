'use client'

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPrivateMessagesAction } from '@/app/homepage/chat/[userId]/_actions/get-private-messages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useSendMessage from '@/app/homepage/chat/[userId]/_hooks/use-send-message'
import MessageCard from '@/components/message-card'
import { useMessageStore } from '@/app/homepage/chat/[userId]/_zustand/messages-store'
import { Skeleton } from '@/components/ui/skeleton'

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

    if (isFetching) return <MessageFormLoading />
    if (initialMessages?.data?.error) return

    return (
        <form onSubmit={onSubmit}>
            <MessageCard />
            <Input
                className='w-3/4 ms-4'
                {...register('message')}
                required
                placeholder='Send your messages'
            />
            <Button className='hidden' />
        </form>
    )
}

const MessageFormLoading = () => {
    return (
        <div className='flex flex-col gap-5 p-3'>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>


        </div>
    )
}

export default MessageForm