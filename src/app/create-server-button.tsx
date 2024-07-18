'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useCreateServer from '@/app/_hooks/useCreateServer'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

const CreateServerButton = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setDialogOpen(!open)}
                    className='w-14 h-14 rounded-full text-4xl'
                    data-cy='create-server-dialog-button'
                >
                    +
                </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create server</DialogTitle>
                </DialogHeader>

                <CreateServerForm closeDialog={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

type CreateServerFormPropsType = {
    closeDialog: () => void
}

const CreateServerForm = ({ closeDialog }: CreateServerFormPropsType) => {
    const {
        onSubmit,
        register,
        isPending,
        setFile
    } = useCreateServer(closeDialog)

    return (
        <form
            onSubmit={onSubmit}
            className='grid gap-4 py-4'
        >
            <div className='grid grid-cols-4 items-center gap-4'>
                <Input
                    {...register('serverName')}
                    required
                    type='text'
                    placeholder='Server name'
                    className='col-span-3'
                />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
                <Input
                    {...register('serverImage')}
                    required
                    type='file'
                    onChange={e => setFile(e.target.files?.[0])}
                    className='col-span-3'
                />
            </div>

            <Button data-cy='create-server-submit' disabled={isPending} type='submit'>
                {isPending ? 'Creating ...' : 'Create server'}
            </Button>
        </form>
    )
}

export default CreateServerButton