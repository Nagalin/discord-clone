import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEdgeStore } from '@/lib/edgestore'
import { createServerAction } from '@/app/_actions/create-server'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

type CreateServerFormType = {
    serverName: string,
    serverImage: File
}

const useCreateServer = (closeDialog: () => void) => {
    const [file, setFile] = useState<File>()
    const { edgestore } = useEdgeStore()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
    } = useForm<CreateServerFormType>()

    const { mutate: createServer, isPending } = useMutation({
        mutationFn: async (serverName: string) => {
            if (file) {
                const res = await edgestore.publicFiles.upload({ file })
                const result = await createServerAction({ 
                    serverName: serverName, serverImage: res.url 
                })

                if (result?.data?.success) {
                    closeDialog()
                    toast({
                        title: 'Horayyyy',
                        description: result.data.success
                    })
                    queryClient.invalidateQueries({ queryKey: ['servers'] })
                } else {
                    toast({
                        title: 'Oops ...',
                        variant: 'destructive',
                        description: result?.data?.error ?? 'Something went wrong'
                    })
                }
            }
        }
    })

    return {
        createServer,
        isPending,
        setFile,
        register,
        handleSubmit
    }
}

export default useCreateServer