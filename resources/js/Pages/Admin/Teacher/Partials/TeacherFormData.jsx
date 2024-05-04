import Input from '@/Components/Input'

// ================================================
export default function TeacherFormData({
  data = {},
  errors = {},
  readOnly = false,
}) {
  const genderRadioValues = [
    { id: 'gender-male', label: 'Masculino', value: 'M' },
    { id: 'gender-female', label: 'Feminino', value: 'F' },
  ]

  return (
    <section className='mb-4'>
      {/* # SUBTÍTULO */}
      <h2 className='mb-5 text-lg font-medium text-gray-900 dark:text-gray-100'>
        Dados pessoais
      </h2>

      {/* NOME DO PROFESSOR */}
      <Input.Text
        id='name'
        type='text'
        label='Nome completo'
        placeholder='Insira o nome do professor...'
        defaultValue={data.name}
        readOnly={readOnly}
        error={errors.name}
        autoFocus
        required
      />

      {/* EMAIL DO PROFESSOR */}
      <Input.Text
        id='email'
        type='email'
        label='Email'
        placeholder='Insira o email do professor...'
        error={errors.email}
        defaultValue={data.email}
        readOnly={readOnly}
      />

      {/* TELEFONE CELULAR DO PROFESSOR */}
      <Input.Text
        id='phone'
        type='tel'
        label='Telefone celular'
        placeholder='Insira o telefone do professor...'
        error={errors.phone}
        defaultValue={data.phone}
        readOnly={readOnly}
      />

      {/* GÊNERO DO PROFESSOR */}
      <Input.Radio
        id='gender'
        label='Gênero do Professor'
        values={genderRadioValues}
        error={errors.gender}
        defaultChecked={data.gender}
        readOnly={readOnly}
      />

      {/* CPF DO PROFESSOR */}
      <Input.Text
        id='cpf'
        type='text'
        label='CPF'
        placeholder='Insira o cpf do professor...'
        error={errors.cpf}
        defaultValue={data.cpf}
        readOnly={readOnly}
      />

      {/* RG DO PROFESSOR */}
      <Input.Text
        id='rg'
        type='text'
        label='RG'
        placeholder='Insira o rg do professor...'
        error={errors.rg}
        defaultValue={data.rg}
        readOnly={readOnly}
      />

      {/* DATA DE NASCIMENTO DO PROFESSOR */}
      <Input.Text
        id='birthday'
        type='date'
        label='Data de nascimento'
        error={errors.birthday}
        defaultValue={data.birthday}
        readOnly={readOnly}
      />
    </section>
  )
}
