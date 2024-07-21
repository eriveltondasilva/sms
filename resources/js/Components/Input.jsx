import { Label, Radio, Select, TextInput, Textarea } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

const inputClassName = 'mb-6 space-y-2'

//
function InputText({
  id = '',
  label = '',
  error = '',
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <TextInput
        id={id}
        name={id}
        type={type}
        {...props}
      />

      {error && <InputError message={error} />}
    </section>
  )
}

function InputTextarea({
  id = '',
  label = '',
  error = '',
  className = '',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <Textarea
        id={id}
        name={id}
        {...props}
      />

      {error && <InputError message={error} />}
    </section>
  )
}

function InputSelect({
  id = '',
  label = '',
  error = '',
  values = [],
  className = '',
  ...props
}) {
  return (
    <section className={twMerge(inputClassName, className)}>
      {label && (
        <Label
          htmlFor={id}
          value={label}
        />
      )}

      <Select
        id={id}
        name={id}
        {...props}>
        {values.map((value, index) => (
          <option
            key={index}
            value={value.id ?? value}>
            {value.name ?? value}
          </option>
        ))}
      </Select>

      {error && <InputError message={error} />}
    </section>
  )
}

function InputRadio({
  id = '',
  label = '',
  error = '',
  values = [],
  defaultChecked = '',
  readOnly = false,
}) {
  return (
    <fieldset className='mb-6 flex max-w-md flex-col gap-4'>
      {label && <Label value={label} />}

      {values.map((item, index) => (
        <div
          key={index}
          className='flex items-center gap-2'>
          <Radio
            id={item.id}
            name={id}
            defaultValue={item.value}
            defaultChecked={item.value === defaultChecked}
            disabled={readOnly}
          />
          <Label
            htmlFor={item.id}
            value={item.label}
          />
        </div>
      ))}

      {error && <InputError message={error} />}
    </fieldset>
  )
}

function InputError({ message = '' }) {
  return <p className='text-sm text-red-600 dark:text-red-400'>{message}</p>
}

//
export const Input = Object.assign(InputText, {
  Text: InputText,
  Textarea: InputTextarea,
  Select: InputSelect,
  Error: InputError,
  Radio: InputRadio,
})
