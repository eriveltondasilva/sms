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

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('password.confirm'))
  }

  return (
    <>
      <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
        Esta é uma área segura do aplicativo. Por favor, confirme sua senha
        antes de continuar.
      </div>

      <form onSubmit={submit}>
        <div className='mt-4'>
          <Input.Text
            id='password'
            type='password'
            label='Password'
            value={data.password}
            error={errors.password}
            onChange={(e) => setData('password', e.target.value)}
            autoFocus
            required
          />
        </div>

        <footer className='mt-4 flex items-center justify-end'>
          <Button type='submit' disabled={processing}>
            Confirmar
          </Button>
        </footer>
      </form>
    </>
  )
}

PageConfirmPassword.layout = (page: any) => (
  <GuestLayout title={titles.confirmPassword}>{page}</GuestLayout>
)
