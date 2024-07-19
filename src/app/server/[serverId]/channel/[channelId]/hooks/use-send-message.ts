import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { sendMessageAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/send-message'
import { useMessageStore } from '@/app/server/[serverId]/channel/[channelId]/_zustand/message-store'
import { pusherClient } from '@/lib/pusher'
import { ChannelMessageType } from '@/dto/channel-message'

type ChatFormType = {
    message: string
}

const useSendMessage = (channelId: string) => {
    const addMessage = useMessageStore(state => state.addMessage)

    useEffect(() => {
        pusherClient.subscribe(`channel-${channelId}`)
        pusherClient.bind('incoming-message', (payload: ChannelMessageType) => {
            addMessage(payload)
        })

        return () => {
            pusherClient.unsubscribe(`channel-${channelId}`)
            pusherClient.unbind('incoming-message')
        }

    }, [channelId])


    const { register, handleSubmit, reset } = useForm<ChatFormType>()

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ channelId, message }: { channelId: string, message: string }) =>
            await sendMessageAction({ channelId, message })
    })

    const onSubmit = handleSubmit(data => {
        sendMessage({ channelId: channelId, message: data.message })
        reset()
    })

    return {
        register,
        sendMessage,
        onSubmit
    }
}

export default useSendMessage
