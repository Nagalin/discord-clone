import React, { ReactNode } from 'react'
import CreateChannel from './create-channel'

type ChannelHeaderPropsType = {
    children: ReactNode
}

const ChannelHeader = ({ children }: ChannelHeaderPropsType) => {
    return (
        <div className='text-2xl flex gap-4'>
            {children}
            <CreateChannel/>
        </div>
    )
}

export default ChannelHeader