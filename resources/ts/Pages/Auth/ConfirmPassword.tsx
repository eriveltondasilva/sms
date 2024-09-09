import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'
import { GuestLayout } from '@/Layouts/GuestLayout'

import { titles } from './data'

export default function PageConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('password.confirm'))
  }

  return (
    <GuestLayout title={titles.confirmPassword}>
      <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
        Esta é uma área segura do aplicativo. Por favor, confirme sua senha
        antes de continuar.
      </div>

      <form onSubmit={handleSubmit}>
        <Input.Text
          id='password'
          type='password'
          label='Senha'
          className='mt-4'
          value={data.password}
          error={errors?.password}
          onChange={(e) => setData('password', e.target.value)}
          autoFocus
          required
        />

        <footer className='mt-4 flex items-center justify-end'>
          <Button
            type='submit'
            disabled={processing}
          >
            Confirmar
          </Button>
        </footer>
      </form>
    </GuestLayout>
  )
}
