'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAddFriend from '@/app/homepage/add-friend/_hooks/use-add-friend'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const AddFriendForm = () => {
    const { register, addFriend, handleSubmit, isSubmitting, errors } = useAddFriend()

    return (
        <div>
            <form
                onSubmit={handleSubmit(data => addFriend(data.username))}
                className='flex gap-5 mb-5'
            >
                <Input
                    {...register('username', { required: true })}
                    className='w-3/4'
                    placeholder='You can add friend by there username'
                />
                <Button disabled={isSubmitting} type='submit'>
                    {isSubmitting ? 'Adding friend ...' : 'Add friend'}
                </Button>
            </form>

            {
                errors.username &&
                <Alert className='w-3/4' variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Username field is required</AlertTitle>
                </Alert>
            }
        </div>
    )
}

export default AddFriendForm