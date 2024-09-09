import { Input } from '@/Components/Input'
import { SchoolYearFormDataProps } from '../types'

export default function SchoolYearFormData({
  data,
  errors,
}: SchoolYearFormDataProps) {
  const isCreateRoute = route().current('*.create')

  return (
    <section>
      {/* ANO LETIVO */}
      <Input.Text
        id='year'
        type='number'
        label='Ano Letivo'
        placeholder='Insira o ano letivo...'
        defaultValue={data?.year}
        error={errors?.year}
        readOnly={!isCreateRoute}
        min='1900'
        max='2100'
        autoFocus
        required
      />

      {/* INÍCIO DO ANO LETIVO */}
      <Input.Text
        id='start_date'
        type='date'
        label='Início do ano letivo'
        defaultValue={data?.start_date}
        error={errors?.start_date}
      />

      {/* FIM DO ANO LETIVO */}
      <Input.Text
        id='end_date'
        type='date'
        label='Fim do ano letivo'
        defaultValue={data?.end_date}
        error={errors?.end_date}
      />
    </section>
  )
}
