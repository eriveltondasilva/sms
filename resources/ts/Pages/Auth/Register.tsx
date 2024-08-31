import { Link, useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'

export default function PageRegister() {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('register'))
  }

  return (
    <form onSubmit={submit}>
      <Input.Text
        id='username'
        type='text'
        label='Nome de usuário'
        placeholder='Nome de Usuário'
        value={data.username}
        error={errors.username}
        onChange={(e) => setData('username', e.target.value)}
        autoComplete='off'
        autoFocus
        required
      />

      <Input.Text
        id='email'
        type='email'
        label='E-mail'
        className='mt-4'
        placeholder='email@example.com'
        value={data.email}
        error={errors.email}
        onChange={(e) => setData('email', e.target.value)}
        autoComplete='off'
        required
      />

      <Input.Text
        id='password'
        type='password'
        label='Senha'
        placeholder='••••••••'
        className='mt-4'
        value={data.password}
        error={errors.password}
        onChange={(e) => setData('password', e.target.value)}
        autoComplete='off'
        required
      />

      <Input.Text
        id='password_confirmation'
        type='password'
        label='Confirme sua senha'
        placeholder='••••••••'
        className='mt-4'
        value={data.password_confirmation}
        error={errors.password_confirmation}
        onChange={(e) => setData('password_confirmation', e.target.value)}
        autoComplete='off'
        required
      />

      <div className='mt-4 flex items-center justify-end'>
        <Link
          href={route('login')}
          className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
        >
          Já registrado?
        </Link>

        <footer className='ms-4'>
          <Button
            type='submit'
            disabled={processing}
          >
            Registrar
          </Button>
        </footer>
      </div>
    </form>
  )
}

PageRegister.layout = (page: any) => (
  <GuestLayout
    title={titles.register}
    children={page}
  />
)
