import { Alert } from 'flowbite-react'
import { AlertOctagon, type LucideIcon } from 'lucide-react'

type Props = {
  icon?: LucideIcon
  children: React.ReactNode
}

export function NotFound({ icon, children }: Props) {
  return (
    <Alert icon={icon || AlertOctagon} color='failure'>
      {children}
    </Alert>
  )
}
