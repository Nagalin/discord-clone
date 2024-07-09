import React from 'react'
import AddFriendForm from '@/app/homepage/add-friend/add-friend-form'

const AddFriendPage = () => {
    return (
        <div>
            <div className='text-2xl'>
                Add friend
            </div>

            <div className='mb-7'>
                You can add friend by their username
            </div>

            <AddFriendForm />
        </div>
    )
}

export default AddFriendPage