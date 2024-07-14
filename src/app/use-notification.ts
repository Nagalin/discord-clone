import { pusherClient } from "@/lib/pusher"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const useNotification = () => {
    // const { data: session } = useSession()
    // useEffect(() => {
    //   if(!session) return
    
    //     pusherClient.subscribe(`noti-${session?.user.userId}`)
    
    //     pusherClient.bind('noti', (data) => {
    //       console.log(data)
    //     })
    //   }, [])
 
}

export default useNotification