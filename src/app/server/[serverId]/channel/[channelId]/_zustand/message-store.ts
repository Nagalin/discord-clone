import { create } from 'zustand'
import { ChannelMessageType } from '@/dto/channel-message'

type MessageStoreType = {
    messages: ChannelMessageType[]
    setMessages: (newMessages: ChannelMessageType[]) => void
    addMessage: (newMessage: ChannelMessageType) => void
}

export const useMessageStore = create<MessageStoreType>(set => ({
    messages: [],
    setMessages: (initialMessage: ChannelMessageType[]) => set({ messages: initialMessage }),
    addMessage: (newMessage: ChannelMessageType) => set(state => ({
        messages: [...state.messages, newMessage]
    }))
}))