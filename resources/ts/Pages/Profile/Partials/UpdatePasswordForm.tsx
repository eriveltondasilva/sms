import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Save } from 'lucide-react'

import { Input } from '@/Components/Input'

export default function UpdatePasswordForm({ className = '' }) {
  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    })

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    })
  }

  return (
    <section className={className}>
      <header>
        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Atualizar senha
        </h2>

        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Certifique-se de que sua conta esteja usando uma senha longa e
          aleatória para permanecer segura.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className='mt-6 space-y-6'
      >
        <Input.Text
          id='current_password'
          type='password'
          label='Senha atual'
          className='mt-1 block w-full'
          value={data.current_password}
          error={errors?.current_password}
          onChange={(e) => setData('current_password', e.target.value)}
        />

        <Input.Text
          id='password'
          type='password'
          label='Nova senha'
          className='mt-1 block w-full'
          value={data.password}
          error={errors?.password}
          onChange={(e) => setData('password', e.target.value)}
        />

        <Input.Text
          id='password_confirmation'
          label='Confirme a nova senha'
          type='password'
          className='mt-1 block w-full'
          value={data.password_confirmation}
          error={errors?.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
        />

        <footer className='flex items-center gap-4'>
          <Button
            type='submit'
            color='blue'
            disabled={processing}
          >
            <Save className='mr-2 size-5' />
            Salvar
          </Button>

          <Transition
            show={recentlySuccessful}
            enter='transition ease-in-out'
            enterFrom='opacity-0'
            leave='transition ease-in-out'
            leaveTo='opacity-0'
          >
            <p className='text-sm text-gray-600 dark:text-gray-400'>Salvo.</p>
          </Transition>
        </footer>
      </form>
    </section>
  )
}
