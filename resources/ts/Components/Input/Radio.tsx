import { Radio as FlowbiteRadio, Label } from 'flowbite-react'

import { Error } from './Error'
import type { RadioProps } from './types'

export function Radio({
  id = '',
  label = '',
  error = '',
  values = [],
  initialCheckedValue = '',
  readOnly = false,
}: RadioProps) {
  return (
    <fieldset className='mb-6 flex max-w-md flex-col gap-4'>
      {label && <Label value={label} />}

      {values.map((value, index) => (
        <div
          key={'input-radio-' + index}
          className='flex items-center gap-2'
        >
          <FlowbiteRadio
            id={value.id}
            name={id}
            defaultValue={value.name}
            defaultChecked={value.name === initialCheckedValue}
            disabled={readOnly}
          />

          <Label
            htmlFor={value.id}
            value={value.label}
          />
        </div>
      ))}

      {error && <Error text={error} />}
    </fieldset>
  )
}
