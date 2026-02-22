import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

interface InputErrorProps extends ComponentProps<'p'> {
    message?: string
}

export default function InputError({
    message,
    className,
    ...props
}: InputErrorProps) {
    if (!message) return null

    return (
        <p
            className={cn('text-sm text-red-600 dark:text-red-400', className)}
            {...props}
        >
            {message}
        </p>
    )
}
