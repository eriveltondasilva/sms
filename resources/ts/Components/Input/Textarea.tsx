import { Textarea as FlowbiteTextarea, Label } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { Error } from './Error'
import type { TextareaProps } from './types'

export function Textarea({
  id,
  className = '',
  error = '',
  label = '',
  ...props
}: TextareaProps) {
  return (
    <section className={twMerge(label && 'mb-6 space-y-2', className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <FlowbiteTextarea
        id={id}
        name={id}
        {...props}
      />

      {error && <Error text={error} />}
    </section>
  )
}
