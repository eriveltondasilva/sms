import { Label, Textarea } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { InputError } from './InputError'
import { type InputTextareaProps } from './types'

export function InputTextarea({
  id,
  className = '',
  error = '',
  label = '',
  ...props
}: InputTextareaProps) {
  return (
    <section className={twMerge(label && 'mb-6 space-y-2', className)}>
      {label && <Label htmlFor={id} value={label} />}

      <Textarea id={id} name={id} {...props} />

      {error && <InputError message={error} />}
    </section>
  )
}
