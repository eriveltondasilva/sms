import { Link, useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import Button from '@/Components/Button'
import Input from '@/Components/Input'

import GuestLayout from '@/Layouts/GuestLayout'

import { titles } from './data'

// ==============================================
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

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    post(route('register'))
  }

  return (
    <form onSubmit={submit}>
      <div>
        <Input.Text
          id='username'
          type='text'
          label='Nome de usuário'
          value={data.username}
          onChange={handleChange}
          placeholder='Nome de Usuário'
          error={errors.username}
          autoComplete='off'
          autoFocus
          required
        />
      </div>

      <div className='mt-4'>
        <Input.Text
          id='email'
          type='email'
          label='Email'
          value={data.email}
          placeholder='email@example.com'
          onChange={handleChange}
          error={errors.email}
          autoComplete='off'
          required
        />
      </div>

      <div className='mt-4'>
        <Input.Text
          id='password'
          type='password'
          label='Senha'
          placeholder='••••••••'
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete='off'
          required
        />
      </div>

      <div className='mt-4'>
        <Input.Text
          id='password_confirmation'
          type='password'
          label='Confirme sua senha'
          placeholder='••••••••'
          value={data.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
          autoComplete='off'
          required
        />
      </div>

      <div className='mt-4 flex items-center justify-end'>
        <Link
          href={route('login')}
          className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'>
          Já registrado?
        </Link>

        <footer className='ms-4'>
          <Button type='submit' disabled={processing}>
            Registrar
          </Button>
        </footer>
      </div>
    </form>
  )
}

PageRegister.layout = (page) => (
  <GuestLayout title={titles.register} children={page} />
)
