'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAddFriend from '@/app/homepage/add-friend/_hooks/use-add-friend'

const AddFriendForm = () => {
    const { register, addFriend, handleSubmit, isSubmitting } = useAddFriend()

    return (
        <form
            onSubmit={handleSubmit(data => addFriend(data.username))}
            className='flex gap-5'
        >
            <Input
                {...register('username')}
                className='w-3/4'
                placeholder='You can add friend by there username'
            />
            <Button disabled={isSubmitting} type='submit'>
                {isSubmitting ? 'Adding friend ...' : 'Add friend'}
            </Button>
        </form>
    )
}

export default AddFriendForm