import { useId, isValidElement, cloneElement } from 'react'

import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field'

interface FieldInputProps {
  id?: string
  label: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactElement
}

function FieldInput({
  id,
  label,
  description,
  error,
  required = false,
  children,
}: FieldInputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  const child =
    isValidElement<{ id?: string; required?: boolean }>(children) ?
      cloneElement(children, { id: fieldId, required })
    : children

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </FieldLabel>

      {child}

      {description && (
        <FieldDescription id={`${fieldId}-description`}>
          {description}
        </FieldDescription>
      )}

      {error && <FieldError id={`${fieldId}-error`}>{error}</FieldError>}
    </Field>
  )
}

function FieldLayout({ children }: { children: React.ReactNode }) {
  return <div className='grid grid-cols-2 gap-4'>{children}</div>
}

export { FieldInput, FieldLayout }
