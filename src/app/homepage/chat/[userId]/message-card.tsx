'use client'

import React from 'react'
import UserCard from '@/components/user-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMessageStore } from '@/app/homepage/chat/[userId]/_zustand/messages-store'

const MessageCard = () => {
    const messages = useMessageStore(state => state.messages)

    return (
        <ScrollArea className='h-[600px] w-[calc(100vw-42rem)] overflow-y-auto'>
            <div className='p-3'>
                {messages.map((curr, index) => {
                    const showSenderInfo = index === 0 || messages[index].sender?.userId !== messages[index - 1].sender?.userId
                    return (
                        <div key={index}>
                            {
                                showSenderInfo &&
                                <div className='flex items-center gap-3 mt-5'>
                                    <UserCard user={curr.sender!} />
                                    <div className='text-xs text-gray-400'>
                                        {curr.createdAt.toLocaleString()}
                                    </div>
                                </div>
                            }
                            <div className='ps-[50px]'>

                                {curr.content}
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default MessageCard