import { Label, TextInput } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { InputError } from './InputError'
import { type InputTextProps } from './types'

export function InputText({
  id = '',
  className = '',
  error = '',
  label = '',
  type = 'text',
  ...props
}: InputTextProps) {
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

      {error && <InputError message={error} />}
    </section>
  )
}
