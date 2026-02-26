import { useForm } from '@inertiajs/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import AdminUserController from '@/wayfinder/App/Http/Controllers/Admin/UserController'

interface User {
  id: number
  name: string
  email: string
}

interface UserSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
}

type UserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const defaultValues: UserFormData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

export function UserSheet({ open, onOpenChange, user }: UserSheetProps) {
  const isEditing = !!user
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<UserFormData>(defaultValues)

  useEffect(() => {
    if (!open) return

    if (user) {
      form.setData({ ...defaultValues, name: user.name, email: user.email })
    } else {
      form.reset()
      form.clearErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      form.put(AdminUserController.update(user.id).url, {
        onSuccess: () => onOpenChange(false),
      })
    } else {
      form.post(AdminUserController.store().url, {
        onSuccess: () => onOpenChange(false),
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>
            {isEditing ? 'Editar usuário' : 'Novo Super Admin'}
          </SheetTitle>
          <SheetDescription>
            {isEditing ?
              'Atualize os dados do usuário. Deixe a senha em branco para mantê-la.'
            : 'Crie um novo usuário com acesso de Super Admin ao sistema.'}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className='flex flex-1 flex-col gap-y-5 overflow-y-auto py-4'
        >
          {/* Nome */}
          <div className='grid gap-1.5'>
            <Label htmlFor='name'>
              Nome <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='name'
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              placeholder='Nome completo'
              autoFocus
            />
            <InputError message={form.errors.name} />
          </div>

          {/* E-mail */}
          <div className='grid gap-1.5'>
            <Label htmlFor='email'>
              E-mail <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              placeholder='email@exemplo.com'
            />
            <InputError message={form.errors.email} />
          </div>

          {/* Senha */}
          <div className='grid gap-1.5'>
            <Label htmlFor='password'>
              Senha {!isEditing && <span className='text-destructive'>*</span>}
              {isEditing && (
                <span className='ml-1 text-xs font-normal text-muted-foreground'>
                  (deixe em branco para manter)
                </span>
              )}
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={form.data.password}
                onChange={(e) => form.setData('password', e.target.value)}
                placeholder='••••••••'
                className='pr-10'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute top-0 right-0 size-9 text-muted-foreground'
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ?
                  <EyeOffIcon className='size-4' />
                : <EyeIcon className='size-4' />}
              </Button>
            </div>
            <InputError message={form.errors.password} />
          </div>

          {/* Confirmação de senha */}
          <div className='grid gap-1.5'>
            <Label htmlFor='password_confirmation'>
              Confirmar senha{' '}
              {!isEditing && <span className='text-destructive'>*</span>}
            </Label>
            <Input
              id='password_confirmation'
              type={showPassword ? 'text' : 'password'}
              value={form.data.password_confirmation}
              onChange={(e) =>
                form.setData('password_confirmation', e.target.value)
              }
              placeholder='••••••••'
            />
            <InputError message={form.errors.password_confirmation} />
          </div>

          <SheetFooter className='mt-auto gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={form.processing}>
              {form.processing ?
                'Salvando...'
              : isEditing ?
                'Salvar alterações'
              : 'Criar usuário'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
