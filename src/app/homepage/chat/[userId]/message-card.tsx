import React from 'react';
import { PrivateMessageType } from '@/dto/private-message';
import UserCard from '@/components/user-card';
import { ScrollArea } from "@/components/ui/scroll-area";

type MessageCardPropsType = {
    messages: PrivateMessageType[]
}

const MessageCard = ({ messages }: MessageCardPropsType) => {
    return (
        <ScrollArea className="h-[600px] overflow-y-auto">
            <div >
                {messages.map((curr, index) => {
                    const showSenderInfo = index === 0 || messages[index].sender?.userId !== messages[index - 1].sender?.userId;
                    return (
                        <div key={index}>
                            {showSenderInfo && <UserCard user={curr.sender!} />}
                            {curr.content}
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    )
}

export default MessageCard;
