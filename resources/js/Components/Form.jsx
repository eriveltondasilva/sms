import { Button, HR, Spinner } from 'flowbite-react'
import { Save, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

//
function FormRoot({ className = '', onSubmit = () => {}, children }) {
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

function FormHeader({ className = '', children }) {
  return (
    <header className='mb-4 space-y-4'>
      <div className={twMerge('flex justify-between', className)}>
        {children}
      </div>
      <HR />
    </header>
  )
}

function FormTitle({ title = '', className = '' }) {
  return (
    <h2 className={twMerge('text-xl font-semibold', className)}>{title}</h2>
  )
}

function FormFooter({ children }) {
  return <footer className='flex flex-col gap-4 sm:flex-row'>{children}</footer>
}

function FormButtonSubmit({ disabled = false }) {
  const isCreate = route().current('*.create')
  const submitButtonText = isCreate ? 'Cadastrar' : 'Atualizar'
  const BtnIcon = disabled ? (
    <Spinner className='mr-2 size-5' />
  ) : (
    <Save className='mr-2 size-5' />
  )

  return (
    <Button
      type='submit'
      disabled={disabled}
      color='blue'
      className='uppercase'
      fullSized>
      {BtnIcon}
      {submitButtonText}
    </Button>
  )
}

function FormButtonReset({ disabled = false }) {
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

//
export const Form = Object.assign(FormRoot, {
  Header: FormHeader,
  Title: FormTitle,
  Footer: FormFooter,
  ButtonSubmit: FormButtonSubmit,
  ButtonReset: FormButtonReset,
})
