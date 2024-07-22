'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAvailableMembersAction } from './_actions/get-available-members'
import UserCard from '@/components/user-card'
import { addMemberToChannelAction } from './_actions/add-member-to-channel'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

const AddMemberToChannel = ({ channelId }: { channelId: string }) => {
    const queryClient = useQueryClient()
    const params = useParams()
    const { serverId } = params
    const { data: availableMembers } = useQuery({
        queryKey: ['available-members', channelId],
        queryFn: async () => getAvailableMembersAction({ serverId, channelId }),
    })

    const handleAddMember = async (userId: string) => {
        await addMemberToChannelAction({ channelId, userId })
        queryClient.invalidateQueries({ queryKey: ['available-members', channelId] })
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <div className='cursor-pointer hover:bg-gray-700 p-2 rounded'>
                    +
                </div>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>

                <DialogHeader>
                    <DialogTitle>Addmember to your channel</DialogTitle>
                </DialogHeader>

                <div className='grid gap-4 py-4'>
                    {availableMembers?.data?.info?.map(curr => (
                        <div className='flex justify-between'>
                            <UserCard user={curr} />
                            <Button onClick={() => handleAddMember(curr.userId)}>
                                Add
                            </Button>
                        </div>
                    ))}
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AddMemberToChannel