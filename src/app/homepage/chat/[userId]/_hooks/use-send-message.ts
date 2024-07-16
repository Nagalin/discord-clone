import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { sendMessageAction } from '@/app/homepage/chat/[userId]/_actions/send-message'
import { pusherClient } from '@/lib/pusher'
import { useMessageStore } from '@/app/homepage/chat/[userId]/_zustand/messages-store'
import { PrivateMessageType } from '@/dto/private-message'

type ChatFormType = {
    message: string
}

const useSendMessage = (privateChatId: string, recipientId: string) => {
    const addMessage = useMessageStore(state => state.addMessage)

    useEffect(() => {
        pusherClient.subscribe(`channel-${privateChatId}`)
        pusherClient.bind('incoming-message', (payload: PrivateMessageType) => {
            addMessage(payload)
        })

        return () => {
            pusherClient.unsubscribe(`channel-${privateChatId}`)
            pusherClient.unbind('incoming-message')
        }

    }, [privateChatId])


    const { register, handleSubmit, reset } = useForm<ChatFormType>()

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ privateChatId, message, recipientId }: { privateChatId: string, message: string, recipientId: string }) =>
            await sendMessageAction({ privateChatId, recipientId, message })
    })

    const onSubmit = handleSubmit(data => {
        sendMessage({ privateChatId, message: data.message, recipientId })
        reset()
    })

    return {
        register,
        sendMessage,
        onSubmit
    }
}

export default useSendMessage
