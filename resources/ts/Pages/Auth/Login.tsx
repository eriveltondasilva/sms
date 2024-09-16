import { Link, useForm } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Lock, Mail } from 'lucide-react'
import { useEffect } from 'react'

import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'
import type { LoginProps } from './types'

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('remember', e.target.checked)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('login'))
  }

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  return (
    <GuestLayout title={titles.login}>
      {status && (
        <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>
      )}

      <form onSubmit={handleSubmit}>
        <Input.Text
          id='email'
          type='email'
          label='Seu Email'
          className='mt-4'
          placeholder='name@exemplo.com'
          icon={Mail}
          value={data.email}
          error={errors?.email}
          onChange={(e) => setData('email', e.target.value)}
          autoFocus
          required
        />

        <Input.Text
          id='password'
          type='password'
          label='Sua Senha'
          placeholder='••••••••'
          className='mt-4'
          icon={Lock}
          value={data.password}
          error={errors?.password}
          onChange={(e) => setData('password', e.target.value)}
          autoComplete='off'
          required
        />

        {/* # Lembre-me e Esqueci minha senha */}
        <section className='mt-6 flex justify-between'>
          <Input.Checkbox
            id='remember'
            label='Lembre-me'
            defaultChecked={data.remember}
            onChange={handleRemember}
          />

          {canResetPassword && (
            <Link
              href={route('password.request')}
              className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
            >
              Esqueceu sua senha?
            </Link>
          )}
        </section>

        <footer className='mt-6 flex flex-col gap-2'>
          <Button
            className='uppercase tracking-wider'
            type='submit'
            color='blue'
            disabled={processing}
          >
            Entrar
          </Button>

          {/* TODO: implementar login com Google */}
          {/* <HR /> */}

          {/* <Button
            as={'a'}
            className='uppercase tracking-wider'
            href={route('socialite.redirect')}
          >
            Entrar com Google
          </Button> */}
        </footer>
      </form>
    </GuestLayout>
  )
}
