import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { addFriendAction } from "@/app/homepage/add-friend/_actions/add-friend"
import { useToast } from "@/components/ui/use-toast"

type AddFriendFormType = {
    username: string
}

const useAddFriend = () => {
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
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

    return {
        register,
        handleSubmit,
        isSubmitting,
        addFriend
    }
}

export default useAddFriend