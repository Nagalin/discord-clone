import React, { ReactNode } from 'react'
import { Alert as ShadcnAlert, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

type AlertPropsType = {
    children: ReactNode
}

const Alert = ({children}: AlertPropsType) => {
    return (
        <ShadcnAlert className='w-1/2' variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{children}</AlertTitle>
        </ShadcnAlert>
    )
}

export default Alert