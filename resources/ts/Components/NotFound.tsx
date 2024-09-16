import { Alert } from 'flowbite-react'
import { AlertOctagon, type LucideIcon } from 'lucide-react'

type NotFoundProps = {
  icon?: LucideIcon
  children: React.ReactNode
}

export function NotFound({ icon, children }: NotFoundProps) {
  return (
    <Alert
      icon={icon || AlertOctagon}
      color='failure'
    >
      {children}
    </Alert>
  )
}
