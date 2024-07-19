import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ServerType } from '@/dto/server'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

const ServerCard = ({ server }: { server: ServerType }) => {
    return (
        <TooltipProvider>
            <Tooltip>

                <TooltipTrigger asChild>
                    <Avatar className='cursor-pointer h-14 w-14'>
                        <AvatarImage src={server.serverImage} />
                        <AvatarFallback />
                    </Avatar>
                </TooltipTrigger>

                <TooltipContent side='right'>
                    {server.serverName}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ServerCard