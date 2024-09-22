import { Label, TextInput } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import type { TextProps } from './types'

export function Text({
  id = '',
  className = '',
  error = '',
  label = '',
  type = 'text',
  helperText = '',
  ...props
}: TextProps) {
  return (
    <section className={twMerge(label && 'mb-6 space-y-2', className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <TextInput
        type={type}
        id={id}
        name={id}
        color={error ? 'failure' : 'gray'}
        helperText={error || helperText}
        {...props}
      />
    </section>
  )
}
