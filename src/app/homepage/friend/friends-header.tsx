import React from 'react'

type FriendsHeaderPropsType = {
    hasFriend: boolean
    friendsNum: number
}

const FriendsHeader = ({ hasFriend, friendsNum }: FriendsHeaderPropsType) => {
    return (
        <div>
            {hasFriend ?
                <div className='text-2xl mb-3'>
                    All friends: {friendsNum}
                </div> :

                <div className='text-2xl mb-3'>
                    No friends ......
                </div>
            }
        </div>
    )
}

export default FriendsHeader