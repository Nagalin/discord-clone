import UserCard from '@/app/user-card'
import { Button } from '@/components/ui/button'
import { UserType } from '@/dto/user'
import React from 'react'

const ReceiveFriendRequestCard = ({ userId, username, image }: Omit<UserType, 'email'>) => {
    return (
        <div className='flex justify-between'>
            <UserCard userId={userId} username={username} image={image} />

            <div className='flex items-center gap-3'>
                <Button> Accept </Button>
                <Button variant='destructive'> Reject </Button>
            </div>
        </div>
    )
}

export default ReceiveFriendRequestCard