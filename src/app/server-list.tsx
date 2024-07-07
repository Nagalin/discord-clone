import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getServersAction } from '@/app/_actions/get-servers'
import CreateServerButton from '@/app/create-server-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ServerList = () => {
  const { data: servers, isFetching } = useQuery({
    queryKey: ['servers'],
    queryFn: async () => await getServersAction({})
  })

  if (isFetching) return <ServerListLoading />
  if (servers?.data?.error) return <div>{servers?.data?.error}</div>

  return (
    <div className='bg-discord-server-list h-screen w-20 flex flex-col  gap-2 items-center pt-2'>
      {servers?.data?.info?.map(currServer => (
        <div>
          <ServerCard
            serverId={currServer.serverId}
            name={currServer.serverName}
            image={currServer.serverImage}
          />
        </div>
      ))}

      <CreateServerButton/>
    </div>
  )
}

type ServerCardPropsType = {
  serverId: string
  name: string
  image: string
}

const ServerCard = ({ serverId, name, image }: ServerCardPropsType) => {
  return (
    <TooltipProvider>
      <Tooltip>

        <TooltipTrigger asChild>
          <Avatar className='cursor-pointer h-14 w-14'>
            <AvatarImage src={image} />
            <AvatarFallback />
          </Avatar>
        </TooltipTrigger>

        <TooltipContent side='right'>
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
const ServerListLoading = () => {
  return (
    <div className="bg-discord-server-list w-20 h-screen flex flex-col items-center gap-2">
      <Skeleton className="h-14 w-14 rounded-full mt-2" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />

    </div>
  )
}

export default ServerList