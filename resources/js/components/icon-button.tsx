import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'

import type { LucideIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

type ButtonType = ComponentProps<typeof Button>

interface IconButtonProps extends ButtonType {
  icon: LucideIcon
  label: string
}

export function IconButton({
  icon,
  label,
  ...props
}: IconButtonProps) {
  return (
    <Button variant='ghost' size='icon' {...props}>
      <Icon iconNode={icon} label={label} />
    </Button>
  )
}
