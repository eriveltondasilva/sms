import { Label, TextInput } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { Error } from './Error'
import type { TextProps } from './types'

export function Text({
  id = '',
  className = '',
  error = '',
  label = '',
  type = 'text',
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
        {...props}
      />

      {error && <Error text={error} />}
    </section>
  )
}
