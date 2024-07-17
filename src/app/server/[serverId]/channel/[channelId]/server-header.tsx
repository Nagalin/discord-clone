'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getServerAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/get-server'
import AddPeople from '@/app/server/[serverId]/channel/[channelId]/add-people'

type ServerHeader = {
  serverName: string
}

const ServerHeader = () => {
  const params = useParams()
  const serverId = params.serverId
  const { data: server, isFetching } = useQuery({
    queryKey: ['server', serverId],
    queryFn: async () => await getServerAction({ serverId: serverId })
  })

  if (isFetching) return null
  return (
    <div className='flex flex-col'>
      <div className='text-2xl text-center border-b-2 border-black pb-3 mb-3'>
        {server?.data?.info?.serverName}
      </div>
      <AddPeople />
    </div>
  )
}

export default ServerHeader
