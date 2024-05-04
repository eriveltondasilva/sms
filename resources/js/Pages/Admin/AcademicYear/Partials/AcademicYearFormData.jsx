import Input from '@/Components/Input'

// ==============================================
export default function AcademicYearFormData({ data = {}, errors = {} }) {
  const isCreateRoute = route().current('*.create')

  return (
    <section>
      <Input.Text
        id='year'
        type='number'
        label='Ano Letivo'
        placeholder='Insira o ano letivo...'
        defaultValue={data.year}
        error={errors.year}
        readOnly={!isCreateRoute}
        maxLength='4'
        minLength='4'
        autoFocus
        required
      />

      <Input.Text
        id='start_date'
        type='date'
        label='Início do ano letivo'
        defaultValue={data.start_date}
        error={errors.start_date}
      />

      <Input.Text
        id='end_date'
        type='date'
        label='Fim do ano letivo'
        defaultValue={data.end_date}
        error={errors.end_date}
      />
    </section>
  )
}
