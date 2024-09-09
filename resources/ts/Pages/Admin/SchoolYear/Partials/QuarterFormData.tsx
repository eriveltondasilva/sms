import { Input } from '@/Components/Input'
import type { SchoolYearFormDataProps } from '../types'

export default function QuarterFormData({
  data,
  errors,
}: SchoolYearFormDataProps) {
  return (
    <section>
      {/* INÍCIO DO BIMESTRE */}
      <Input.Text
        id='quarter[start_date]'
        type='date'
        label='Início do bimestre'
        defaultValue={data?.start_date}
        error={errors?.start_date}
      />

      {/* FIM DO BIMESTRE */}
      <Input.Text
        id='quarter[end_date]'
        type='date'
        label='Fim do bimestre'
        defaultValue={data?.end_date}
        error={errors?.end_date}
      />
    </section>
  )
}
