'use client'

import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getServersAction } from '@/app/_actions/get-servers'
import CreateServerButton from '@/app/create-server-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ServerType } from '@/dto/server'
import { useToast } from '@/components/ui/use-toast'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'

const ServerList = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { data: servers, isFetching } = useQuery({
    queryKey: ['servers'],
    queryFn: async () => await getServersAction({})
  })

  useEffect(() => {
    if (servers?.data?.error) {
      toast({
        title: 'Oops ...',
        description: servers.data.error,
        variant: 'destructive'
      })
    }
  }, [servers, toast])

  if (isFetching) return <ServerListLoading />

  return (
    <div
      className='bg-discord-server-list h-screen w-20 flex flex-col  gap-2 items-center pt-2'
    >
      {servers?.data?.info?.map(currServer => (
        <div
          onClick={() => router.push(`/server/${currServer.serverId}/channel/${currServer.generalChannelId}`)}
          key={currServer.serverId}
        >
          <ServerCard
            server={currServer}
          />
        </div>
      ))}

      <CreateServerButton />
    </div>
  )
}

type ServerCardPropsType = {
  server: ServerType
}

const ServerCard = ({ server }: ServerCardPropsType) => {
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

const ServerListLoading = () => {
  return (
    <div className='bg-discord-server-list w-20 h-screen flex flex-col items-center gap-2'>
      <Skeleton className='h-14 w-14 rounded-full mt-2' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />
      <Skeleton className='h-14 w-14 rounded-full' />

    </div>
  )
}

export default ServerList