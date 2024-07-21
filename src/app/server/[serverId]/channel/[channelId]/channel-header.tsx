import React, { ReactNode } from 'react'
import CreateChannel from './create-channel'

const ChannelHeader = ({ children }: { children: ReactNode }) => {
    return (
        <div className='text-xl flex gap-4 items-center'>
            {children}
            <CreateChannel />
        </div>
    )
}

export default ChannelHeader