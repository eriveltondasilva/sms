import { Link, useForm } from '@inertiajs/react'
import { Lock, Mail } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/Components/Button/index'
import { Checkbox } from '@/Components/Checkbox'
import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'

type PageLogin = {
  status: string
  canResetPassword: boolean
}

export default function PageLogin({ status, canResetPassword }: PageLogin) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <GuestLayout title={titles.login}>
      {status && (
        <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>
      )}

      <form onSubmit={submit}>
        <Input.Text
          id='email'
          type='email'
          label='Seu Email'
          className='mt-4'
          placeholder='name@exemplo.com'
          icon={Mail}
          value={data.email}
          error={errors.email}
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
          error={errors.password}
          onChange={(e) => setData('password', e.target.value)}
          autoComplete='off'
          required
        />

        {/* # Lembre-me e Esqueci minha senha */}
        <section className='mt-6 flex justify-between'>
          <label className='flex items-center'>
            <Checkbox
              name='remember'
              defaultChecked={data.remember}
              onChange={(e: any) => setData('remember', e.target.value)}
            />
            <span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>
              Lembre-me
            </span>
          </label>

          {canResetPassword && (
            <Link
              href={route('password.request')}
              className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
            >
              Esqueceu sua senha?
            </Link>
          )}
        </section>

        {/* footer */}
        <footer className='mt-6 flex flex-col gap-2'>
          <Button
            type='submit'
            disabled={processing}
          >
            Entrar com Email
          </Button>

          {/* TODO: implementar login com Google */}
          {/* <HR /> */}

          {/* <Button
            as='a'
            href={route('socialite.redirect', 'google')}
            variant='secondary'
            disabled={processing}>
            <SignInGoogle />
            Entrar com Google
          </Button> */}
        </footer>
      </form>
    </GuestLayout>
  )
}
