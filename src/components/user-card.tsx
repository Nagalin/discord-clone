import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserType } from '@/dto/user'
import { useOnlineUserContext } from '@/contexts/online-user-provider'

type UserPropsType = {
    user: Omit<UserType, | 'email'>,
}

const UserCard = ({ user }: UserPropsType) => {
    const { isUserOnline } = useOnlineUserContext()
    const isOnline = isUserOnline(user.userId)

    return (
        <div className='relative flex items-center gap-2'>
            <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback />
            </Avatar>

            {
                isOnline ?
                    <div className='absolute bg-green-500 rounded-full w-4 h-4 left-6 top-6' />
                    :
                    <div className='absolute bg-gray-500 rounded-full w-4 h-4 left-6 top-6' />}

            <div>{user.username}</div>
        </div>
    )
}

export default UserCard