import { useQueryClient } from '@tanstack/react-query'
import { cancelFriendRequestAction } from '@/app/homepage/pending/_actions/cancel-friend-request'

const useCancelFriendRequests = () => {
    const queryClient = useQueryClient()
    const handleCancelFriendRequest = async (friendshipId: string, recipientId: string) => {
        await cancelFriendRequestAction({
            friendshipId: friendshipId, recipientId: recipientId
        })
        queryClient.invalidateQueries({ queryKey: ['pending-friend-requests'] })
    }

    return { 
        handleCancelFriendRequest 
    }
}

export default useCancelFriendRequests