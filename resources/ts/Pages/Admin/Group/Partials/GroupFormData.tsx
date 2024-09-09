import { usePage } from '@inertiajs/react'

import { Input } from '@/Components/Input'
import type { PageProps } from '@/Types'

import type { GroupFormDataProps } from '../types'

export default function GroupFormData({ data, errors }: GroupFormDataProps) {
  const activeYear = usePage<PageProps>().props.auth?.activeYear

  const nameSelectValues = ['6° Ano', '7° Ano', '8° Ano', '9° Ano']
  const shiftSelectValues = ['Matutino', 'Vespertino']

  return (
    <section>
      <Input.Hidden
        id='school_year_id'
        value={String(activeYear?.id)}
      />

      <Input.Text
        id='school_year_display'
        type='text'
        label='Ano Letivo'
        error={errors.school_year_id}
        defaultValue={activeYear?.year}
        disabled
      />

      <Input.Select
        id='name'
        label='Turma'
        defaultValue={data?.name || nameSelectValues[0]}
        disabled={!!data?.name}
        error={errors.name}
        values={nameSelectValues}
        autoFocus
        required
      />

      <Input.Text
        id='classroom'
        type='text'
        label='Sala'
        placeholder='insira a sala...'
        defaultValue={data?.classroom || ''}
        error={errors.classroom}
      />

      <Input.Select
        id='shift'
        label='Turno'
        defaultValue={data?.shift || shiftSelectValues.at(-1)}
        values={shiftSelectValues}
        error={errors.shift}
      />
    </section>
  )
}
