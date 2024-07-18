import { create } from 'zustand'
import { PrivateMessageType } from '@/dto/private-message'

type MessageStoreType = {
    messages: PrivateMessageType[]
    setMessages: (newMessages: PrivateMessageType[]) => void
    addMessage: (newMessage: PrivateMessageType) => void
}

export const useMessageStore = create<MessageStoreType>(set => ({
    messages: [],
    setMessages: (initialMessage: PrivateMessageType[]) => set({ messages: initialMessage }),
    addMessage: (newMessage: PrivateMessageType) => set(state => ({
        messages: [...state.messages, newMessage]
    }))
}))