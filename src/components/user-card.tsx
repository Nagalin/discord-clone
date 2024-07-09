import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserType } from '@/dto/user'

type UserPropsType = {
    user: Omit<UserType, 'userId' | 'email'>
}

const UserCard = ({ user }: UserPropsType) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback />
            </Avatar>
            <div>{user.username}</div>
        </div>
    )
}

export default UserCard