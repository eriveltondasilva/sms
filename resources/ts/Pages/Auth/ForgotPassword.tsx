import { useForm } from '@inertiajs/react'

import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'
import type { ForgotPasswordProps } from './types'

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('password.email'))
  }

  return (
    <GuestLayout title={titles.forgotPassword}>
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
          error={errors?.email}
          onChange={(e) => setData('email', e.target.value)}
          autoFocus
          required
        />

        <footer className='mt-4 flex items-center justify-end'>
          <Button
            type='submit'
            disabled={processing}
          >
            Link de redefinição de senha de e-mail
          </Button>
        </footer>
      </form>
    </GuestLayout>
  )
}
