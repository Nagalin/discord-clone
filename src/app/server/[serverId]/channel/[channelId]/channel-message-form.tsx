'use client'

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import MessageCard from '@/app/homepage/chat/[userId]/message-card'
import { useMessageStore } from '@/app/server/[serverId]/channel/[channelId]/_zustand/message-store'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'
import { getChannelMessageAction } from './_actions/get-channel-message'
import { useForm } from 'react-hook-form'
import { sendMessageAction } from './_actions/send-message'

type FormType = {
    message: string
}

const ChannelMessageForm = () => {
    const queryClient = useQueryClient()
    const setMessages = useMessageStore(state => state.setMessages)
    const params = useParams()
    const channelId = params.channelId
    const { handleSubmit, register } = useForm<FormType>()

    const { data: initialMessages, isFetching } = useQuery({
        queryKey: ['channel-messages'],
        queryFn: async () => {
            const messages = await getChannelMessageAction({
                channelId: channelId
            })

            setMessages(messages?.data?.info!)

            return messages
        }
    })

    // const { onSubmit, register } = useSendMessage(privateChatId, recipientId)
    console.log(initialMessages)

    if (isFetching) return <MessageFormLoading />
    if (initialMessages?.data?.error) return

    return (

        <form onSubmit={handleSubmit(data => sendMessageAction({
            message: data.message,
            channelId: channelId
        }))}>
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

export default ChannelMessageForm