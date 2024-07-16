import { create } from 'zustand'
import { UnreadMessagesType } from '@/dto/private-message'
import { UserType } from '@/dto/user'

type MessageNotiStoreType = {
    unreadMessages: UnreadMessagesType[]
    setUnreadMessage: (initialUnreadMessages: UnreadMessagesType[]) => void
    incrementUnreadMessageCount: (sender: UserType) => void
}

export const useMessageNotiStore = create<MessageNotiStoreType>((set) => ({
    unreadMessages: [],
    setUnreadMessage: (initialUnreadMessages: UnreadMessagesType[]) =>
        set({ unreadMessages: initialUnreadMessages }),
    incrementUnreadMessageCount: (sender: UserType) =>
        set(state => {
            const existingUnreadMessage = state.unreadMessages.find(
                unreadMessage => unreadMessage.user.userId === sender.userId
            )

            if (existingUnreadMessage) {
                return {
                    unreadMessages: state.unreadMessages.map(curr =>
                        curr.user.userId === sender.userId
                            ? { ...curr, unreadMessagesCount: curr.unreadMessagesCount + 1 }
                            : curr
                    )
                }
            } else {
                const newUnreadMessage: UnreadMessagesType = {
                    user: {
                        userId: sender.userId,
                        username: sender.username,
                        image: sender.image,
                        email: sender.email
                    },
                    unreadMessagesCount: 1,
                }

                return { unreadMessages: [...state.unreadMessages, newUnreadMessage] }
            }
        })


}))