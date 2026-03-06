import { useFormContext } from '@inertiajs/react'

import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldLegend,
  FieldDescription,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import type { App } from '@/wayfinder/types'

interface SchoolFormFieldsProps {
  data?: Partial<App.Models.School>
}

export function SchoolFormFields({ data }: SchoolFormFieldsProps) {
  const errors = useFormContext()?.errors

  return (
    <>
      <FieldSet>
        <FieldLegend>Informações Básicas</FieldLegend>
        <FieldDescription>Dados principais da instituição</FieldDescription>

        <FieldGroup>
          {/* Nome completo */}
          <Field data-invalid={!!errors?.full_name}>
            <FieldLabel htmlFor='full_name'>
              Nome completo <span className='text-destructive'>*</span>
            </FieldLabel>
            <Input
              id='full_name'
              name='full_name'
              placeholder='Ex: Escola Municipal Dom Pedro II'
              defaultValue={data?.full_name ?? undefined}
              aria-invalid={!!errors?.full_name}
              maxLength={255}
              autoFocus
              required
            />
            {errors?.full_name && (
              <FieldError id=''>{errors.full_name}</FieldError>
            )}
          </Field>

          {/* Nome abreviado */}
          <Field data-invalid={!!errors?.short_name}>
            <FieldLabel htmlFor='short_name'>
              Nome abreviado <span className='text-destructive'>*</span>
            </FieldLabel>
            <Input
              id='short_name'
              name='short_name'
              placeholder='Ex: EM Dom Pedro II'
              defaultValue={data?.short_name ?? undefined}
              aria-invalid={!!errors?.short_name}
              maxLength={50}
              required
            />
            {errors?.short_name && <FieldError>{errors.short_name}</FieldError>}
          </Field>

          {/* Lema */}
          <Field data-invalid={!!errors?.motto}>
            <FieldLabel htmlFor='motto'>Lema</FieldLabel>
            <FieldDescription>
              Frase que representa a missão da escola
            </FieldDescription>
            <Input
              id='motto'
              name='motto'
              placeholder='Ex: Educando para o futuro'
              defaultValue={data?.motto ?? undefined}
              aria-invalid={!!errors?.motto}
              maxLength={255}
            />
            {errors?.motto && <FieldError>{errors.motto}</FieldError>}
          </Field>

          <div className='grid gap-4 sm:grid-cols-2'>
            {/* CNPJ */}
            <Field data-invalid={!!errors?.cnpj}>
              <FieldLabel htmlFor='cnpj'>
                CNPJ <span className='text-destructive'>*</span>
              </FieldLabel>
              <Input
                id='cnpj'
                name='cnpj'
                placeholder='Somente números'
                defaultValue={data?.cnpj ?? undefined}
                aria-invalid={!!errors?.cnpj}
                pattern='\d{14}'
                maxLength={14}
                className='font-mono'
                autoComplete='off'
                required
              />
              {errors?.cnpj && <FieldError>{errors.cnpj}</FieldError>}
            </Field>

            {/* INEP */}
            <Field data-invalid={!!errors?.inep_code}>
              <FieldLabel htmlFor='inep_code'>Código INEP</FieldLabel>
              <Input
                id='inep_code'
                name='inep_code'
                placeholder='8 dígitos'
                defaultValue={data?.inep_code ?? undefined}
                aria-invalid={!!errors?.inep_code}
                maxLength={8}
                autoComplete='off'
                className='font-mono'
              />
              {errors?.inep_code && <FieldError>{errors.inep_code}</FieldError>}
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Contato</FieldLegend>
        <FieldDescription>Informações de contato da escola</FieldDescription>

        <FieldGroup>
          <div className='grid gap-4 sm:grid-cols-2'>
            {/* Telefone */}
            <Field data-invalid={!!errors?.phone}>
              <FieldLabel htmlFor='phone'>Telefone</FieldLabel>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='(00) 00000-0000'
                defaultValue={data?.phone ?? undefined}
                aria-invalid={!!errors?.phone}
                maxLength={15}
              />
              {errors?.phone && <FieldError>{errors.phone}</FieldError>}
            </Field>

            {/* E-mail */}
            <Field data-invalid={!!errors?.email}>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='escola@email.com'
                defaultValue={data?.email ?? undefined}
                aria-invalid={!!errors?.email}
              />
              {errors?.email && <FieldError>{errors.email}</FieldError>}
            </Field>
          </div>

          {/* Endereço */}
          <Field data-invalid={!!errors?.address}>
            <FieldLabel htmlFor='address'>Endereço</FieldLabel>
            <Textarea
              id='address'
              name='address'
              placeholder='Rua, número, bairro, cidade - UF, CEP'
              defaultValue={data?.address ?? undefined}
              aria-invalid={!!errors?.address}
              rows={3}
            />
            {errors?.address && <FieldError>{errors.address}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />
    </>
  )
}
