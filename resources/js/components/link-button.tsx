import { Link } from '@inertiajs/react'

import { Button } from './ui/button'

import type { ComponentProps } from 'react'

type ButtonType = ComponentProps<typeof Button>
type LinkType = Omit<ComponentProps<typeof Link>, 'size'>

interface LinkButtonProps extends LinkType {
  variant?: ButtonType['variant']
  size?: ButtonType['size']
}

export function LinkButton({
  variant,
  size,
  className,
  disabled,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      asChild
    >
      <Link disabled={disabled} {...props}>
        {children}
      </Link>
    </Button>
  )
}
