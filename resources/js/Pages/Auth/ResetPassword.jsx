import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import Button from '@/Components/Button'
import Input from '@/Components/Input'

import GuestLayout from '@/Layouts/GuestLayout'

import { titles } from './data'

// ==============================================
export default function PageResetPassword({ token, email }) {
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

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    post(route('password.store'))
  }

  return (
    <form onSubmit={submit}>
      <div>
        <Input.Text
          id='email'
          type='email'
          label='Email'
          value={data.email}
          autoComplete='username'
          onChange={handleChange}
          errors={errors.email}
          autoFocus
          required
        />
      </div>

      <div className='mt-4'>
        <Input.Text
          id='password'
          type='password'
          label='Senha'
          value={data.password}
          autoComplete='new-password'
          onChange={handleChange}
          errors={errors.password}
          required
        />
      </div>

      <div className='mt-4'>
        <Input.Text
          id='password_confirmation'
          type='password'
          label='Confirmar senha'
          value={data.password_confirmation}
          autoComplete='new-password'
          onChange={handleChange}
          errors={errors.password_confirmation}
          required
        />
      </div>

      <footer className='mt-4 flex items-center justify-end'>
        <Button type='submit' disabled={processing}>
          Resetar sua senha
        </Button>
      </footer>
    </form>
  )
}

PageResetPassword.layout = (page) => (
  <GuestLayout title={titles.resetPassword} children={page} />
)
