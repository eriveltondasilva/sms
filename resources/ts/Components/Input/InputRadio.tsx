import { Label, Radio } from 'flowbite-react'
import { InputError } from './InputError'

import type { InputRadioProps } from './types'

export function InputRadio({
  id = '',
  label = '',
  error = '',
  values = [],
  initialCheckedValue = '',
  readOnly = false,
}: InputRadioProps) {
  return (
    <fieldset className='mb-6 flex max-w-md flex-col gap-4'>
      {label && <Label value={label} />}

      {values.map((value, index) => (
        <div key={'input-radio-' + index} className='flex items-center gap-2'>
          <Radio
            id={value.id}
            name={id}
            defaultValue={value.name}
            defaultChecked={value.name === initialCheckedValue}
            disabled={readOnly}
          />
          <Label htmlFor={value.id} value={value.label} />
        </div>
      ))}

      {error && <InputError message={error} />}
    </fieldset>
  )
}
