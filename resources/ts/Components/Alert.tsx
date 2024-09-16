import { type InertiaLinkProps, Link } from '@inertiajs/react'
import { type AlertProps, Alert as FlowbiteAlert } from 'flowbite-react'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type AlertRootProps = {
  onDismiss?: boolean
  children: React.ReactNode
} & AlertProps

function AlertRoot({
  className,
  onDismiss,
  children,
  ...props
}: AlertRootProps) {
  const [isShown, setIsShown] = useState(true)

  const handleDismiss = useCallback(() => {
    setIsShown(false)
  }, [onDismiss])

  if (isShown === false) return null

  return (
    <FlowbiteAlert
      className={twMerge('mb-4', className)}
      onDismiss={onDismiss && handleDismiss}
      {...props}
    >
      {children}
    </FlowbiteAlert>
  )
}

function AlertLink({
  children,
  ...props
}: React.PropsWithChildren<InertiaLinkProps>) {
  return (
    <Link
      className='font-medium text-blue-600 underline hover:no-underline dark:text-blue-500'
      {...props}
    >
      {children}
    </Link>
  )
}

export const Alert = Object.assign(AlertRoot, {
  Link: AlertLink,
})
