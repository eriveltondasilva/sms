import { Input } from '@/Components/Input'
import { SchoolYear } from '@/Types'

type SchoolYearFormDataProps = {
  data?: SchoolYear
  errors: any
}

export default function QuarterFormData({
  data,
  errors,
}: SchoolYearFormDataProps) {
  return (
    <section>
      <Input.Text
        id='quarter[start_date]'
        type='date'
        label='Início do bimestre'
        defaultValue={data?.start_date}
        error={errors.start_date}
      />

      <Input.Text
        id='quarter[end_date]'
        type='date'
        label='Fim do bimestre'
        defaultValue={data?.end_date}
        error={errors.end_date}
      />
    </section>
  )
}
