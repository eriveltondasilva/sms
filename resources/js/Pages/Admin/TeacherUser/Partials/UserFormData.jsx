import Input from '@/Components/Input'

export default function UserFormData({ data = {}, errors = {} }) {
  const isCreationRoute = route().current('*.create')

  return (
    <section className='mb-4'>
      <Input.Text
        id='username'
        type='text'
        label='Nome de usuário'
        placeholder='Insira o nome de usuário...'
        error={errors.username}
        defaultValue={data.username || ''}
        required
      />

      {/* EMAIL DO USUÁRIO */}
      <Input.Text
        id='email'
        type='text'
        label='Seu email'
        placeholder='Insira o email de usuário...'
        error={errors.email}
        defaultValue={data.email || ' '}
        autoComplete='false'
        required
      />

      {/* SENHA DO USUÁRIO */}
      <Input.Text
        id='password'
        type='text'
        label='Senha'
        placeholder=''
        error={errors.password}
        defaultValue={data.password}
        required={isCreationRoute}
      />

      {/* CONFIRMAÇÃO DE SENHA */}

      <Input.Text
        id='password_confirmation'
        type='text'
        label='Confirme senha'
        placeholder=''
        error={errors.password_confirmation}
        required={isCreationRoute}
      />
    </section>
  )
}
