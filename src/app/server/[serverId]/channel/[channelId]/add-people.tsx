'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAvailableFriendsAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/get-available-friends'
import { useParams } from 'next/navigation'
import UserCard from '@/components/user-card'
import { addFriendToServerAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/add-friend-to-server'

const AddPeople = () => {
    const params = useParams()
    const serverId = params.serverId
    const channelId = params.channelId
    const { data: availableFriends } = useQuery({
        queryKey: ['available-friends', serverId],
        queryFn: async () => await getAvailableFriendsAction({ serverId: serverId })
    })
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


    return (
        <Dialog >
            <DialogTrigger asChild>
                <div className='cursor-pointer hover:bg-gray-700 p-2 rounded'>
                    Add people
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add your friends to your server</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    {availableFriends?.data?.info?.map(curr => (
                        <div className='flex justify-between'>
                            <UserCard user={curr} />
                            <Button onClick={() => addFriendToServer(curr.userId)}>
                                Add
                            </Button>
                        </div>
                    ))}

                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AddPeople