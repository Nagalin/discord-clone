import React from 'react'

const FriendsHeader = ({ hasFriend, friendsNum }: { 
    hasFriend: boolean, friendsNum: number 
}) => {
    return (
        <div>
            {
                hasFriend ?
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