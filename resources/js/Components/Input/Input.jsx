import { Label, Radio, Select, TextInput, Textarea } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

const inputClassName = 'mb-6 space-y-2'

// ===============================================
export function InputText({
  id = '',
  label = '',
  error = '',
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {/* # texto do label */}
      {label && <Label htmlFor={id} value={label} />}

      {/* # input text */}
      <TextInput id={id} name={id} type={type} {...props} />

      {/* # erro */}
      {error && <InputError message={error} />}
    </section>
  )
}

// -----------------------------------------------
export function InputTextarea({
  id = '',
  label = '',
  error = '',
  className = '',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {/* # texto do label */}
      {label && <Label htmlFor={id} value={label} />}

      {/* # input textarea */}
      <Textarea id={id} name={id} {...props} />

      {/* # erro */}
      {error && <InputError message={error} />}
    </section>
  )
}

// -----------------------------------------------
export function InputSelect({
  id = '',
  label = '',
  error = '',
  values = [],
  className = '',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {/* # texto do label */}
      {label && <Label htmlFor={id} value={label} />}

      {/* # input select */}
      <Select id={id} name={id} {...props}>
        {values.map((value, index) => (
          <option key={index} value={value.id ?? value}>
            {value.name ?? value}
          </option>
        ))}
      </Select>

      {/* # erro */}
      {error && <InputError message={error} />}
    </section>
  )
}

// -----------------------------------------------
export function InputRadio({
  id = '',
  label = '',
  error = '',
  values = [],
  defaultChecked = '',
  readOnly = false,
}) {
  return (
    <fieldset className='mb-6 flex max-w-md flex-col gap-4'>
      {/* # texto do label */}
      {label && <Label value={label} />}

      {/* # input radio */}
      {values.map((item, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Radio
            id={item.id}
            name={id}
            defaultValue={item.value}
            defaultChecked={item.value === defaultChecked}
            disabled={readOnly}
          />
          <Label htmlFor={item.id} value={item.label} />
        </div>
      ))}

      {/* # erro */}
      {error && <InputError message={error} />}
    </fieldset>
  )
}

// ==============================================
export function InputError({ message = '' }) {
  return <p className='text-sm text-red-600 dark:text-red-400'>{message}</p>
}
