import { type ButtonProps, Button, Spinner } from 'flowbite-react'
import { type LucideIcon, Save, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type FormRootProps = {
  className?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

function FormRoot({ className, onSubmit, children }: FormRootProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        'mx-2 flex max-w-lg flex-col gap-4 sm:mx-10 md:mx-20',
        className,
      )}
    >
      {children}
    </form>
  )
}

function FormFooter({ children }: { children: React.ReactNode }) {
  return <footer className='flex flex-col gap-4 sm:flex-row'>{children}</footer>
}

type FormButtonProps = {
  icon?: LucideIcon
} & ButtonProps

function FormButton({
  icon: Icon,
  type = 'button',
  color = 'blue',
  disabled = false,
  children,
  ...props
}: React.PropsWithChildren<FormButtonProps>) {
  const ButtonIcon = disabled ? Spinner : Icon
  return (
    <Button
      type={type}
      color={color}
      fullSized
      {...props}
    >
      {Icon && <Icon className='mr-2 size-5' />}
      {children}
    </Button>
  )
}

function FormButtonSubmit({ disabled }: { disabled: boolean }) {
  const isCreate = route().current('*.create')
  const submitButtonText = isCreate ? 'Cadastrar' : 'Atualizar'
  const BtnIcon =
    disabled ?
      <Spinner
        size='sm'
        className='mr-2 size-5'
      />
    : <Save className='mr-1 size-5' />

  return (
    <Button
      type='submit'
      disabled={disabled}
      color='blue'
      className='uppercase'
      fullSized
    >
      {BtnIcon}
      {submitButtonText}
    </Button>
  )
}

function FormButtonReset({ disabled }: { disabled: boolean }) {
  const isCreate = route().current('*.create')
  const resetButtonText = isCreate ? 'Limpar' : 'Redefinir'

  return (
    <Button
      type='reset'
      disabled={disabled}
      color='light'
      className='uppercase'
      fullSized
    >
      <Trash2 className='mr-2 size-5' />
      {resetButtonText}
    </Button>
  )
}

export const Form = Object.assign(FormRoot, {
  Footer: FormFooter,
  Button: FormButton,
  ButtonSubmit: FormButtonSubmit,
  ButtonReset: FormButtonReset,
})
