import { FileInput, Label } from 'flowbite-react'

import type { FileProps } from './types'

export function File({ id, label, ...props }: FileProps) {
  return (
    <section className='mb-6 space-y-2'>
      <Label
        htmlFor={id}
        value={label}
      />

      <FileInput
        id={id}
        name={id}
        {...props}
      />
    </section>
  )
}
