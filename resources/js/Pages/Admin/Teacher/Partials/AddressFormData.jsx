import Input from '@/Components/Input'

// ==============================================
export default function AddressFormData({
  data = {},
  errors = {},
  readOnly = false,
}) {
  return (
    <section className='mb-4'>
      {/* # SUBTÍTULO */}
      <h2 className='mb-5 text-lg font-medium text-gray-900 dark:text-gray-100'>
        Endereço
      </h2>

      {/* ENDEREÇO DO PROFESSOR */}
      <Input.Text
        id='address_street'
        type='text'
        label='Endereço'
        placeholder='Insira o endereço do professor...'
        error={errors.address_street}
        defaultValue={data.address_street}
        readOnly={readOnly}
      />

      {/* CIDADE DO PROFESSOR */}
      <Input.Text
        id='address_city'
        type='text'
        label='Cidade'
        placeholder='Insira a cidade do professor...'
        error={errors.address_city}
        defaultValue={data.address_city}
        readOnly={readOnly}
      />

      {/* ESTADO DO PROFESSOR */}
      <Input.Text
        id='address_state'
        type='text'
        label='Estado'
        placeholder='Insira o estado do professor...'
        error={errors.address_state}
        defaultValue={data.address_state}
        readOnly={readOnly}
      />

      {/* CEP DO PROFESSOR */}
      <Input.Text
        id='address_zip_code'
        type='text'
        label='CEP'
        placeholder='Insira o cep do professor...'
        error={errors.address_zip_code}
        defaultValue={data.address_zip_code}
        readOnly={readOnly}
      />
    </section>
  )
}
