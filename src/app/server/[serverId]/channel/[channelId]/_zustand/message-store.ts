import { create } from 'zustand'
import { ChannelMessageWithSenderInfoType } from '@/dto/channel-message'

type MessageStoreType = {
    messages: ChannelMessageWithSenderInfoType[]
    setMessages: (newMessages: ChannelMessageWithSenderInfoType[]) => void
    addMessage: (newMessage: ChannelMessageWithSenderInfoType) => void
}

export const useMessageStore = create<MessageStoreType>(set => ({
    messages: [],
    setMessages: (initialMessage: ChannelMessageWithSenderInfoType[]) => set({ messages: initialMessage }),
    addMessage: (newMessage: ChannelMessageWithSenderInfoType) => set(state => ({
        messages: [...state.messages, newMessage]
    }))
}))