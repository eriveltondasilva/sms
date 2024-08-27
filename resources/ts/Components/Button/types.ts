import { COLOR_VARIANTS, SIZE_VARIANTS } from './styles'

export type ButtonProps = {
  variant?: keyof typeof COLOR_VARIANTS
  size?: keyof typeof SIZE_VARIANTS
  full?: boolean
  disabled?: boolean
  as?: 'button' | 'a'
  type?: 'submit' | 'reset'
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}
