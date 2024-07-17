'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAvailableFriendsAction } from './_actions/get-available-friends'
import { useParams } from 'next/navigation'
import UserCard from '@/components/user-card'

const AddPeople = () => {
    const params = useParams()
    const serverId = params.serverId
    const {data: availableFriends} = useQuery({
        queryKey: ['available-friends', serverId],
        queryFn: async () => await getAvailableFriendsAction({serverId: serverId})
    })
   

    return (
        <Dialog >
            <DialogTrigger asChild>
                <div className='cursor-pointer hover:bg-gray-700 p-2 rounded'>
                    Add people
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add your friends to your server</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                {availableFriends?.data?.info?.map(curr => (
                    <div className='flex justify-between'>
                        <UserCard user={curr}/>
                        <Button> Add </Button>
                    </div>
                ))}
                   
                </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default AddPeople