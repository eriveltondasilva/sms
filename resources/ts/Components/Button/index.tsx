import { twJoin } from 'tailwind-merge'
import { COLOR_VARIANTS, DEFAULT_VARIANTS, SIZE_VARIANTS } from './styles'

import type { ButtonProps } from './types'

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'base',
  full = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <Component
      disabled={disabled}
      className={twJoin(
        DEFAULT_VARIANTS,
        SIZE_VARIANTS[size],
        COLOR_VARIANTS[variant],
        full && 'w-full',
        disabled && 'cursor-not-allowed opacity-25',
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
