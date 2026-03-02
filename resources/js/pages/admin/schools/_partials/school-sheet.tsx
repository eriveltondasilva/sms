import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

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
import { Textarea } from '@/components/ui/textarea'
import {
  store as schoolStore,
  update as schoolUpdate,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

interface School {
  id: number
  full_name: string
  short_name: string
  motto: string | null
  inep_code: string | null
  cnpj: string
  phone: string | null
  email: string | null
  address: string | null
}

interface SchoolSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  school?: School | null
}

type SchoolFormData = {
  full_name: string
  short_name: string
  motto: string
  inep_code: string
  cnpj: string
  phone: string
  email: string
  address: string
}

const defaultValues: SchoolFormData = {
  full_name: '',
  short_name: '',
  motto: '',
  inep_code: '',
  cnpj: '',
  phone: '',
  email: '',
  address: '',
}

export function SchoolSheet({ open, onOpenChange, school }: SchoolSheetProps) {
  const isEditing = !!school

  const form = useForm<SchoolFormData>(defaultValues)

  // Sync form data when school changes or sheet opens
  useEffect(() => {
    if (!open) return

    if (school) {
      form.setData({
        full_name: school.full_name,
        short_name: school.short_name,
        motto: school.motto ?? '',
        inep_code: school.inep_code ?? '',
        cnpj: school.cnpj,
        phone: school.phone ?? '',
        email: school.email ?? '',
        address: school.address ?? '',
      })
    } else {
      form.reset()
      form.clearErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, school?.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      form.put(schoolUpdate(school.id).url, {
        onSuccess: () => onOpenChange(false),
      })
    } else {
      form.post(schoolStore().url, {
        onSuccess: () => onOpenChange(false),
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Editar Escola' : 'Nova Escola'}</SheetTitle>
          <SheetDescription>
            {isEditing ?
              'Atualize os dados da escola abaixo.'
            : 'Preencha os dados para cadastrar uma nova escola.'}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className='flex flex-1 flex-col gap-y-5 overflow-y-auto py-4'
        >
          {/* Nome completo */}
          <div className='grid gap-1.5'>
            <Label htmlFor='full_name'>
              Nome completo <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='full_name'
              value={form.data.full_name}
              onChange={(e) => form.setData('full_name', e.target.value)}
              placeholder='Ex: Escola Estadual João da Silva'
              autoFocus
            />
            <InputError message={form.errors.full_name} />
          </div>

          {/* Nome abreviado */}
          <div className='grid gap-1.5'>
            <Label htmlFor='short_name'>
              Nome abreviado <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='short_name'
              value={form.data.short_name}
              onChange={(e) => form.setData('short_name', e.target.value)}
              placeholder='Ex: E.E. João da Silva'
              maxLength={50}
            />
            <InputError message={form.errors.short_name} />
          </div>

          {/* Lema */}
          <div className='grid gap-1.5'>
            <Label htmlFor='motto'>Lema</Label>
            <Input
              id='motto'
              value={form.data.motto}
              onChange={(e) => form.setData('motto', e.target.value)}
              placeholder='Ex: Educando para o futuro'
            />
            <InputError message={form.errors.motto} />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* CNPJ */}
            <div className='grid gap-1.5'>
              <Label htmlFor='cnpj'>
                CNPJ <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='cnpj'
                value={form.data.cnpj}
                onChange={(e) =>
                  form.setData('cnpj', e.target.value.replace(/\D/g, ''))
                }
                placeholder='Somente números'
                maxLength={14}
              />
              <InputError message={form.errors.cnpj} />
            </div>

            {/* INEP */}
            <div className='grid gap-1.5'>
              <Label htmlFor='inep_code'>Código INEP</Label>
              <Input
                id='inep_code'
                value={form.data.inep_code}
                onChange={(e) =>
                  form.setData(
                    'inep_code',
                    e.target.value.replace(/\D/g, '').slice(0, 8),
                  )
                }
                placeholder='8 dígitos'
                maxLength={8}
              />
              <InputError message={form.errors.inep_code} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* Telefone */}
            <div className='grid gap-1.5'>
              <Label htmlFor='phone'>Telefone</Label>
              <Input
                id='phone'
                value={form.data.phone}
                onChange={(e) => form.setData('phone', e.target.value)}
                placeholder='(00) 00000-0000'
              />
              <InputError message={form.errors.phone} />
            </div>

            {/* E-mail */}
            <div className='grid gap-1.5'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                id='email'
                type='email'
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                placeholder='escola@email.com'
              />
              <InputError message={form.errors.email} />
            </div>
          </div>

          {/* Endereço */}
          <div className='grid gap-1.5'>
            <Label htmlFor='address'>Endereço</Label>
            <Textarea
              id='address'
              value={form.data.address}
              onChange={(e) => form.setData('address', e.target.value)}
              placeholder='Rua, número, bairro, cidade - UF'
              rows={3}
            />
            <InputError message={form.errors.address} />
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
              : 'Criar escola'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
