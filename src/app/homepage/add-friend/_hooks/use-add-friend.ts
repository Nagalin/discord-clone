import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { addFriendAction } from '@/app/homepage/add-friend/_actions/add-friend'
import { useToast } from '@/components/ui/use-toast'

type AddFriendFormType = {
    username: string
}

const useAddFriend = () => {
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<AddFriendFormType>()

    const { mutate: addFriend } = useMutation({
        mutationFn: async (username: string) => {
            const res = await addFriendAction({ username: username })
            if (res?.data?.success) {
                toast({
                    description: res.data.success
                })
            } else {
                toast({
                    title: 'Oops ....',
                    description: res?.data?.error,
                    variant: 'destructive'
                })
            }
        }
    })

    const onSubmit = handleSubmit(data => addFriend(data.username))

    return {
        register,
        onSubmit,
        isSubmitting,
        errors
    }
}

export default useAddFriend