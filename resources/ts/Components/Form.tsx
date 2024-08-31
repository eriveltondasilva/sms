import { type ButtonProps, Button } from 'flowbite-react'
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
  children: string
} & ButtonProps

function FormButton({
  icon: Icon,
  type = 'button',
  color = 'blue',
  disabled = false,
  children,
  ...props
}: FormButtonProps) {
  return (
    <Button
      type={type}
      color={color}
      disabled={disabled}
      className='uppercase'
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
  const submitText = isCreate ? 'Cadastrar' : 'Atualizar'

  return (
    <FormButton
      icon={Save}
      disabled={disabled}
      type='submit'
    >
      {submitText}
    </FormButton>
  )
}

function FormButtonReset({ disabled }: { disabled: boolean }) {
  const isCreate = route().current('*.create')
  const resetText = isCreate ? 'Limpar' : 'Redefinir'

  return (
    <FormButton
      type='reset'
      disabled={disabled}
      color='failure'
      icon={Trash2}
    >
      {resetText}
    </FormButton>
  )
}

export const Form = Object.assign(FormRoot, {
  Footer: FormFooter,
  Button: FormButton,
  ButtonSubmit: FormButtonSubmit,
  ButtonReset: FormButtonReset,
})
