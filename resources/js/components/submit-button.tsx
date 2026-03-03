import { SaveIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Icon } from './icon'
import { Spinner } from './ui/spinner'

import type { VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'

interface SubmitButtonProps extends VariantProps<typeof Button> {
  text: string
  loadingText: string
  icon?: LucideIcon
}

export function SubmitButton({
  text,
  loadingText,
  disabled,
  icon,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type='submit' disabled={disabled} {...props}>
      {disabled ?
        <Spinner />
      : <Icon iconNode={icon ?? SaveIcon} />}

      {disabled ? loadingText : text}
    </Button>
  )
}
