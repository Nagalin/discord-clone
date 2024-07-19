import React, { ReactNode } from 'react'
import CreateChannel from './create-channel'

const ChannelHeader = ({ children }: { children: ReactNode }) => {
    return (
        <div className='text-2xl flex gap-4'>
            {children}
            <CreateChannel />
        </div>
    )
}

export default ChannelHeader