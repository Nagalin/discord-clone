import React from 'react'

type OnlineFriendHeaderPropsType = {
    isFriendsOnline: boolean
    onlineFriendsNum: number
}

const OnlineFriendHeader = ({isFriendsOnline, onlineFriendsNum}: OnlineFriendHeaderPropsType) => {
  return (
    <div>
         {isFriendsOnline? (
        <div className='text-2xl mb-3'>
          Online friends: {onlineFriendsNum}
        </div>
      ) : (
        <div className='text-2xl mb-3'>
          No one is online ......
        </div>
      )}
    </div>
  )
}

export default OnlineFriendHeader