import { Label, Select } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { InputError } from './InputError'
import { type InputSelectProps } from './types'

export function InputSelect({
  id = '',
  className = '',
  error = '',
  label = '',
  values = [],
  ...props
}: InputSelectProps) {
  return (
    <section className={twMerge(label && 'mb-6 space-y-2', className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <Select
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
      </Select>

      {error && <InputError message={error} />}
    </section>
  )
}
