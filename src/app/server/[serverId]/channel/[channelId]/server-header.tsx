'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getServerAction } from './_actions/get-server'

type ServerHeader = {
  serverName: string
}

const ServerHeader = () => {
  const params = useParams()
  const serverId = params.serverId
  const {data: server, isFetching } = useQuery({
    queryKey: [serverId],
    queryFn: async () => await getServerAction({serverId: serverId})
  })

  if(isFetching) return 
  return (
    <Accordion type="single" collapsible >

      <AccordionItem value="item-3">
        <AccordionTrigger>{server?.data?.info?.serverName}</AccordionTrigger>
        <AccordionContent>
          Add people
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ServerHeader