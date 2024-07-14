import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { sendMessageAction } from '../_actions/send-message'

type ChatFormType = {
    message: string
}

const useSendMessage = (privateChatId: string, recipientId: string) => {
    const { register, handleSubmit } = useForm<ChatFormType>()

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({privateChatId, message, recipientId }: { privateChatId: string, message: string, recipientId: string }) => 
            await sendMessageAction({ privateChatId, recipientId, message })
    })

    const onSubmit = handleSubmit(data => sendMessage({privateChatId, message: data.message, recipientId }))

    return {
        register,
        sendMessage,
        onSubmit
    }
}

export default useSendMessage
