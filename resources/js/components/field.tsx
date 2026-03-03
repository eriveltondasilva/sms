import { useId, isValidElement, cloneElement } from 'react'

import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field'

interface FieldInputProps {
  name: string
  label: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactElement
}

function FieldInput({
  name,
  label,
  description,
  error,
  required = false,
  children,
}: FieldInputProps) {
  const id = name + useId()

  const child =
    isValidElement<{ id: string; name: string; required: boolean }>(children) ?
      cloneElement(children, { id, name, required })
    : children

  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </FieldLabel>

      {child}

      {description && (
        <FieldDescription id={`${id}-description`}>
          {description}
        </FieldDescription>
      )}

      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </Field>
  )
}

function FieldLayout({ children }: { children: React.ReactNode }) {
  return <div className='grid grid-cols-2 gap-4'>{children}</div>
}

export { FieldInput, FieldLayout }
