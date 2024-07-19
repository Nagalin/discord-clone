'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getServersAction } from '@/app/_actions/get-servers'
import CreateServerButton from '@/app/create-server-button'
import ServerCard from '@/app/server-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

const Servers = () => {
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
      className='bg-discord-server-list 
      h-screen w-20 flex flex-col  gap-2 items-center'
    >
      {servers?.data?.info?.map(currServer => (
        <Link
          href='/server/[serverId]/channel/[channelId]'
          as={`/server/${currServer.serverId}/channel/${currServer.generalChannelId}`}
          key={currServer.serverId}
        >
          <ServerCard
            server={currServer}
          />
        </Link>
      ))}

      <CreateServerButton />
    </div>
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

export default Servers