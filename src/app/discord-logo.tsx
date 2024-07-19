import React from 'react'
import Link from 'next/link'
import discord from '@/assets/discord.svg'
import Image from 'next/image'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const DiscordLogo = () => {
    return (
        <div>
            <TooltipProvider>
                <Tooltip>

                    <TooltipTrigger className='cursor-pointer' asChild>
                        <Link href='/homepage'>
                            <Image
                                height={55}
                                width={55}
                                src={discord}
                                alt='discord logo'
                            />
                        </Link>
                    </TooltipTrigger>

                    <TooltipContent side='right'>
                        Private message
                    </TooltipContent>

                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default DiscordLogo