import { useForm } from '@inertiajs/react'

import Button from '@/Components/Button'
import Input from '@/Components/Input'

import GuestLayout from '@/Layouts/GuestLayout'

import { titles } from './data'

// ==============================================
export default function PageForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('password.email'))
  }

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  return (
    <>
      <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
        Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de
        e-mail e enviaremos por e-mail um link de redefinição de senha que
        permitirá que você escolha um novo.
      </div>

      {status && (
        <div className='mb-4 text-sm font-medium text-green-600 dark:text-green-400'>
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <Input.Text
          id='email'
          type='email'
          value={data.email}
          onChange={handleChange}
          error={errors.email}
          required
          autoFocus
        />

        <footer className='mt-4 flex items-center justify-end'>
          <Button type='submit' disabled={processing}>
            Link de redefinição de senha de e-mail
          </Button>
        </footer>
      </form>
    </>
  )
}

PageForgotPassword.layout = (page) => (
  <GuestLayout title={titles.forgotPassword}>{page}</GuestLayout>
)
