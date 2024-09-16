import { Checkbox as FlowbiteCheckbox, Label } from 'flowbite-react'

import type { CheckboxProps } from './types'

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <div className='flex items-center space-x-2'>
      <FlowbiteCheckbox
        id={id}
        name={id}
        {...props}
      />

      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
