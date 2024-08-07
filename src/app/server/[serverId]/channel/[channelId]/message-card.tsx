import React from 'react'
import { useMessageStore } from '@/app/server/[serverId]/channel/[channelId]/_zustand/message-store'
import UserCard from '@/components/user-card'
import { ScrollArea } from '@/components/ui/scroll-area'

const MessageCard = () => {
    const messages = useMessageStore(state => state.messages)

    return (
        <ScrollArea className='h-[650px] w-[calc(100vw-34rem)]'>
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