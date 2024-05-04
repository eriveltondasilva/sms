import { Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Save } from 'lucide-react'

import Input from '@/Components/Input'

// ============================================================================
export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}) {
  const user = usePage().props.auth.user || {}

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      username: user.username,
      email: user.email,
    })

  // ----------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault()
    patch(route('profile.update'))
  }

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  return (
    <section className={className}>
      <Header />

      <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
        <div>
          <Input.Text
            id='username'
            type='text'
            label='Nome de usuário'
            className='mt-1 block w-full'
            value={data.username}
            onChange={handleChange}
            autoComplete='username'
            autoFocus
            required
          />

          <Input.Error message={errors.username} />
        </div>

        <div>
          <Input.Text
            id='email'
            type='email'
            label='Seu email'
            className='mt-1 block w-full'
            value={data.email}
            onChange={handleChange}
            required
            autoComplete='username'
          />

          <Input.Error message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className='mt-2 text-sm text-gray-800 dark:text-gray-200'>
              Seu email ainda não foi verificado.
              <Link
                href={route('verification.send')}
                method='post'
                as='button'
                className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'>
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

        <Footer
          processing={processing}
          recentlySuccessful={recentlySuccessful}
        />
      </form>
    </section>
  )
}

// ----------------------------------------------
function Header() {
  return (
    <header>
      <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
        Informação do Perfil
      </h2>

      <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
        Atualize sua informação do perfil e endereço de email.
      </p>
    </header>
  )
}

// ----------------------------------------------
function Footer({ processing, recentlySuccessful }) {
  return (
    <footer className='flex items-center gap-4'>
      {/* Botão de salvar */}

      <Button type='submit' color='blue' disabled={processing}>
        <Save className='mr-2 h-5 w-5' />
        Salvar
      </Button>

      <Transition
        show={recentlySuccessful}
        enter='transition ease-in-out'
        enterFrom='opacity-0'
        leave='transition ease-in-out'
        leaveTo='opacity-0'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>Salvo.</p>
      </Transition>
    </footer>
  )
}
