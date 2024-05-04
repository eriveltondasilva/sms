import { Button } from 'flowbite-react'
import { Save, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import HorizontalLine from '../HorizontalLine'

// ===========================================================================
export function FormRoot({ className = '', onSubmit = () => {}, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        'mx-2 flex max-w-lg flex-col gap-4 sm:mx-10 md:mx-20',
        className
      )}>
      {children}
    </form>
  )
}

// ------------------------------------
export function FormHeader({ className = '', children }) {
  return (
    <header className='mb-4 space-y-4'>
      <div className={twMerge('flex justify-between', className)}>
        {children}
      </div>
      <HorizontalLine />
    </header>
  )
}

// ------------------------------------
export function FormHeaderTitle({ title = '', className = '' }) {
  return (
    <h2 className={twMerge('text-xl font-semibold', className)}>{title}</h2>
  )
}

// ------------------------------------
export function FormFooter({ children }) {
  return <footer className='flex flex-col gap-4 sm:flex-row'>{children}</footer>
}

// ------------------------------------
export function FormFooterButtonSubmit({ disabled = false }) {
  const isCreate = route().current('*.create')
  const submitButtonText = isCreate ? 'Cadastrar' : 'Atualizar'

  return (
    <Button
      type='submit'
      disabled={disabled}
      color='blue'
      className='uppercase'
      fullSized>
      <Save className='mr-2 h-5 w-5' />
      {submitButtonText}
    </Button>
  )
}

// ------------------------------------
export function FormFooterButtonReset({ disabled = false }) {
  const isCreate = route().current('*.create')
  const resetButtonText = isCreate ? 'Limpar' : 'Redefinir'

  return (
    <Button
      type='reset'
      disabled={disabled}
      color='light'
      className='uppercase'
      fullSized>
      <Trash2 className='mr-2 h-5 w-5' />
      {resetButtonText}
    </Button>
  )
}
