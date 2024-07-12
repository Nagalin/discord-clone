import React from 'react'
import RecipientCard from './recipient-card'

type PrivateMessagePagePropsType = {
    params: {
        chatId: string
    }
}

const PrivateMessagePage = ({ params }: PrivateMessagePagePropsType) => {
    
    return (
        <div>
            <RecipientCard privateChatId={params.chatId}/>
        
        </div>
    )
}

export default PrivateMessagePage