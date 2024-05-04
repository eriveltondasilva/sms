import { twJoin } from 'tailwind-merge'
import { COLOR_VARIANTS, DEFAULT_VARIANTS, SIZE_VARIANTS } from './data'

// ==============================================
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'base',
  full = false,
  disabled = false,
  children,
  ...props
}) {
  const buttonClasses = twJoin(
    DEFAULT_VARIANTS,
    SIZE_VARIANTS[size],
    COLOR_VARIANTS[variant],
    full && 'w-full',
    disabled && 'cursor-not-allowed opacity-25'
  )

  return (
    <Component disabled={disabled} className={buttonClasses} {...props}>
      {children}
    </Component>
  )
}
