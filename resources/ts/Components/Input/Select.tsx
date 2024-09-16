import { Select as FlowbiteSelect, Label } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { Error } from './Error'
import type { SelectProps } from './types'

export function Select({
  id = '',
  className = '',
  error = '',
  label = '',
  values = [],
  ...props
}: SelectProps) {
  return (
    <section className={twMerge(label && 'mb-6 space-y-2', className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <FlowbiteSelect
        id={id}
        name={id}
        {...props}
      >
        {values.map((value, index) => (
          <option
            key={'input-select-' + index}
            value={typeof value === 'string' ? value : value.id}
          >
            {typeof value === 'string' ? value : value.name}
          </option>
        ))}
      </FlowbiteSelect>

      {error && <Error text={error} />}
    </section>
  )
}
