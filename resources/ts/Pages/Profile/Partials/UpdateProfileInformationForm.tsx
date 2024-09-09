import { Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Save } from 'lucide-react'

import { Input } from '@/Components/Input'
import { PageProps } from '@/Types'

type UpdateProfileInformationProps = {
  mustVerifyEmail: boolean
  status: string
  className?: string
}

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: UpdateProfileInformationProps) {
  const { user } = usePage<PageProps>().props.auth

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      username: user.username,
      email: user.email,
    })

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    patch(route('profile.update'))
  }

  return (
    <section className={className}>
      <header>
        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Informação do Perfil
        </h2>

        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Atualize sua informação do perfil e endereço de email.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className='mt-6 space-y-6'
      >
        <div>
          <Input.Text
            id='username'
            type='text'
            label='Nome de usuário'
            className='mt-1 block w-full'
            value={data.username}
            error={errors?.username}
            onChange={(e) => setData('username', e.target.value)}
            autoFocus
            required
          />
        </div>

        <div>
          <Input.Text
            id='email'
            type='email'
            label='Seu email'
            className='mt-1 block w-full'
            value={data.email}
            error={errors?.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className='mt-2 text-sm text-gray-800 dark:text-gray-200'>
              Seu email ainda não foi verificado.
              <Link
                href={route('verification.send')}
                method='post'
                as='button'
                className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
              >
                Clique aqui para enviar um novo link de verificação.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className='mt-2 text-sm font-medium text-green-600 dark:text-green-400'>
                Um novo link de verificação foi enviado para seu email.
              </div>
            )}
          </div>
        )}

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
