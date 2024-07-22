'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getServerInfoAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/get-server-info'

const ServerHeader = () => {
  const params = useParams()
  const serverId = params.serverId
  const { data: server, isFetching } = useQuery({
    queryKey: ['server', serverId],
    queryFn: async () => await getServerInfoAction({ serverId: serverId })
  })

  if (isFetching) return

  return (
    <div className='flex flex-col'>
      <div className='text-2xl text-center border-b-2 border-black pb-3 mb-3'>
        {server?.data?.info?.serverName}
      </div>
    </div>
  )
}

export default ServerHeader
