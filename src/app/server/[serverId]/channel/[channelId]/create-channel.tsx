'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { createChannelAction } from './_actions/create-channel'

const FormSchema = z.object({
    type: z.enum(['Text', 'Voice'], {
        required_error: 'You need to select a notification type.',
    }),
    channelName: z.string()
})

const CreateChannel = () => {
    const params = useParams()
    const serverId = params.serverId
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const queryClient = useQueryClient()

    const { mutate: createChannel } = useMutation({
        mutationFn: async (data: z.infer<typeof FormSchema>) => {
            await createChannelAction({
                serverId: serverId,
                channelName: data.channelName,
                channelType: data.type
            })
            queryClient.invalidateQueries({ queryKey: ['channels', serverId] })
        }

    })

    const selectedType = watch('type')

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // Perform your server action or react-query mutation here
        toast({
            title: 'You submitted the following values:',
            description: (
                <div className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </div>
            ),
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost'> + </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        you can create new channel here
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(data => createChannel(data))} className='w-2/3 space-y-6'>
                    <div className='space-y-3'>
                        <label>Notify me about...</label>
                        <RadioGroup className='flex flex-col space-y-1'>
                            <div className='flex items-center space-x-3 space-y-0'>
                                <Input type='radio' id='textChannel' value='Text' {...register('type')} defaultChecked={selectedType === 'Text'} />
                                <label htmlFor='textChannel' className='font-normal'>Text channel</label>
                            </div>
                            <div className='flex items-center space-x-3 space-y-0'>
                                <Input type='radio' id='voiceChannel' value='Voice' {...register('type')} defaultChecked={selectedType === 'Voice'} />
                                <label htmlFor='voiceChannel' className='font-normal'>Voice channel</label>
                            </div>
                        </RadioGroup>
                        {errors.type && <p>{errors.type.message}</p>}
                    </div>
                    <div>
                        <label>Channel name</label>
                        <Input {...register('channelName')} placeholder='Channel name' />
                        {errors.channelName && <p>{errors.channelName.message}</p>}
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChannel
