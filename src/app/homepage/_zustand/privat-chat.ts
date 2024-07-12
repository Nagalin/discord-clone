import { PrivateChatType } from '@/dto/private-chat'
import { create } from 'zustand'

type privateChatStore = {
    privateChat: PrivateChatType | null
    setPrivateChat: (privateChat: PrivateChatType) => void
}

export const usePrivateChatStore = create<privateChatStore>(set =>({
    privateChat: null,
    setPrivateChat: (privateChat: PrivateChatType) => set(state => ({privateChat: privateChat}))
}))