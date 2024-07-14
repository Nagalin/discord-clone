import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { sendMessageAction } from '../_actions/send-message'
import { useEffect } from 'react'
import { pusherClient } from '@/lib/pusher'
import { useMessageStore } from '../_zustand/messages-store'
import { PrivateMessageType } from '@/dto/private-message'

type ChatFormType = {
    message: string
}

const useSendMessage = (privateChatId: string, recipientId: string) => {
    const { addMessage } = useMessageStore()

    useEffect(() => {
        pusherClient.subscribe(`channel-${privateChatId}`)
        pusherClient.bind('message', (content: PrivateMessageType) => {
            addMessage(content)
        })

        return () => {
            pusherClient.unsubscribe(`channel-${privateChatId}`)
            pusherClient.unbind('message')
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
