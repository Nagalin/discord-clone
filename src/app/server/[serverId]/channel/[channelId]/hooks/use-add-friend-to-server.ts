import { addFriendToServerAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/add-friend-to-server'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAddFriendToServer = (serverId: string, channelId: string) => {
    const queryClient = useQueryClient()
    const { mutate: addFriendToServer } = useMutation({
        mutationKey: ['available-friends-mutate', serverId],
        mutationFn: async (friendId: string) => {
            await addFriendToServerAction({
                serverId: serverId,
                friendId: friendId,
                channelId: channelId
            })
            queryClient.invalidateQueries({ queryKey: ['available-friends'] })
        }
    })

    return {
        addFriendToServer
    }
  
}

export default useAddFriendToServer