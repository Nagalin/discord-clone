import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

type ChatFormType = {
    message: string
}

const useSendMessage = () => {
    const { register, handleSubmit } = useForm<ChatFormType>()

    const sendMessage = useMutation({
        mutationFn: async (data: ChatFormType, recipientId: string) => sendMessageAction({recipientId: recipientId, message: data.message})
    })

    return {
        register,
        handleSubmit,
        sendMessage
    }
  
}

export default useSendMessage