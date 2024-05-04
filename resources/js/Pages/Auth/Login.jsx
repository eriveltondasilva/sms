import { Link, useForm } from '@inertiajs/react'
import { Lock, Mail } from 'lucide-react'
import { useEffect } from 'react'

import Button from '@/Components/Button'
import Checkbox from '@/Components/Checkbox'
import Input from '@/Components/Input'

import GuestLayout from '@/Layouts/GuestLayout'

import { titles } from './data'

// ==============================================
export default function PageLogin({ status, canResetPassword }) {
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

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <>
      {/* # status */}
      {status && (
        <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>
      )}

      <form onSubmit={submit}>
        {/* # Email */}
        <div className='mt-4'>
          <Input.Text
            id='email'
            type='email'
            label='Seu Email'
            icon={Mail}
            onChange={handleChange}
            placeholder='name@exemplo.com'
            value={data.email}
            error={errors.email}
            autoFocus
            required
          />
        </div>

        {/* # Senha */}
        <div className='mt-4'>
          <Input.Text
            id='password'
            type='password'
            label='Sua Senha'
            icon={Lock}
            onChange={handleChange}
            placeholder='••••••••'
            value={data.password}
            error={errors.password}
            required
          />
        </div>

        {/* # Lembre-me e Esqueci minha senha */}
        <section className='mt-6 flex justify-between'>
          <label className='flex items-center'>
            <Checkbox
              name='remember'
              defaultChecked={data.remember}
              onChange={handleChange}
            />
            <span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>
              Lembre-me
            </span>
          </label>

          {canResetPassword && (
            <Link
              href={route('password.request')}
              className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'>
              Esqueceu sua senha?
            </Link>
          )}
        </section>

        {/* footer */}
        <footer className='mt-6 flex flex-col gap-2'>
          <Button type='submit' disabled={processing}>
            Entrar com Email
          </Button>

          {/* TODO: implementar login com Google */}
          {/* <HorizontalLine text='OU' /> */}

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
    </>
  )
}

PageLogin.layout = (page) => (
  <GuestLayout title={titles.login} children={page} />
)
