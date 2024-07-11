import React from 'react'

type FriendsHeaderPropsType = {
    hasFriend: boolean
    onlineFriendsNum: number
}

const FriendsHeader = ({ hasFriend, onlineFriendsNum }: FriendsHeaderPropsType) => {
    return (
        <div>
            {hasFriend ?
                <div className='text-2xl mb-3'>
                    All friends: {onlineFriendsNum}
                </div> :

                <div className='text-2xl mb-3'>
                    No friends ......
                </div>
            }
        </div>
    )
}

export default FriendsHeader