import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'

type PageResetPasswordProps = {
  token: string
  email: string
}

export default function PageResetPassword({
  token,
  email,
}: PageResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('password.store'))
  }

  return (
    <GuestLayout title={titles.resetPassword}>
      <form onSubmit={submit}>
        <Input.Text
          id='email'
          type='email'
          label='E-mail'
          value={data.email}
          error={errors?.email}
          onChange={(e) => setData('email', e.target.value)}
          autoFocus
          required
        />

        <Input.Text
          id='password'
          type='password'
          label='Senha'
          className='mt-4'
          value={data.password}
          error={errors?.password}
          onChange={(e) => setData('password', e.target.value)}
          required
        />

        <Input.Text
          id='password_confirmation'
          type='password'
          label='Confirmar senha'
          className='mt-4'
          value={data.password_confirmation}
          error={errors?.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          required
        />

        <footer className='mt-4 flex items-center justify-end'>
          <Button
            type='submit'
            disabled={processing}
          >
            Reconfigurar sua senha
          </Button>
        </footer>
      </form>
    </GuestLayout>
  )
}
