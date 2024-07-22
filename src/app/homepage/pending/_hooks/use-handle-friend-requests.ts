import { useQueryClient } from '@tanstack/react-query'
import { acceptFriendRequestAction, rejectFriendRequestAction } from '@/app/homepage/pending/_actions/handle-friend-request'
import { useToast } from '@/components/ui/use-toast'

const useHandleFriendRequests = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const handleFriendRequest = async (
        action: 'Accept' | 'Reject', friendshipId: string, requesterId: string
    ) => {
        const actionFunction = action === 'Accept' ? 
        acceptFriendRequestAction : rejectFriendRequestAction
        
        const res = await actionFunction({
            friendshipId: friendshipId, requesterId: requesterId
        })

        if (!res?.data?.error) {
            queryClient.invalidateQueries({ queryKey: ['pending-friend-requests'] })
        } else {
            toast({
                title: 'Oops ...',
                description: res.data.error,
                variant: 'destructive'
            })
        }
    }

    return {
        handleFriendRequest
    }

}

export default useHandleFriendRequests