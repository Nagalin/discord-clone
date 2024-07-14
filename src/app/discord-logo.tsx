'use client'

import React from 'react'
import discord from '@/assets/discord.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

const DiscordLogo = () => {
    const router = useRouter()
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
                                onClick={() => router.push('/homepage')}
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