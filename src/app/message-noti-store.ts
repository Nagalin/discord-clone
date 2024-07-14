import { create } from 'zustand'
import { UserType } from '@/dto/user'

type UnreadMessage = {
    messageCount: number
    user: UserType
}

type MessageNotiStoreType = {
    unreadMessage: UnreadMessage[]
    setUnreadMessage: (newUnreadMessage: UnreadMessage) => void
}

export const useMessageNotiStore = create<MessageNotiStoreType>(set => ({
    unreadMessage: [],
    setUnreadMessage: (newUnreadMessage: UnreadMessage) => set(state => ({
        unreadMessage: [...state.unreadMessage, newUnreadMessage],
    }))
}))
