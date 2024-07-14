import React from 'react'
import UserCard from '@/components/user-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMessageStore } from './_zustand/messages-store'

const MessageCard = () => {
    const { messages } = useMessageStore()
    return (
        <ScrollArea className='h-[600px] overflow-y-auto'>
            <div >
                {messages.map((curr, index) => {
                    const showSenderInfo = index === 0 || messages[index].sender?.userId !== messages[index - 1].sender?.userId
                    return (
                        <div key={index}>
                            {showSenderInfo && <UserCard user={curr.sender!} />}
                            {curr.content}
                        </div>
                    )
                })}
            </div>
        </ScrollArea>

        
    )
}

export default MessageCard
