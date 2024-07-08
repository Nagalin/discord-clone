import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type UserCardPropsType = {
    userId: string
    username: string
    image: string
}

const UserCard = ({ userId, username, image }: UserCardPropsType) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback />
            </Avatar>
            <div>{username}</div>
        </div>
    )
}

export default UserCard