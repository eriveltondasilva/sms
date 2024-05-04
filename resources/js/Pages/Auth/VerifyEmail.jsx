import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'

import Button from '@/Components/Button'

import { titles } from './data'

// ==============================================
export default function PageVerifyEmail({ status }) {
  const { post, processing } = useForm({})

  const submit = (e) => {
    e.preventDefault()
    post(route('verification.send'))
  }

  return (
    <>
      <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
        Obrigado por inscrever-se! Antes de começar, você poderia verificar seu
        endereço de e-mail clicando no link que acabamos de enviar para você? Se
        você não recebeu o e-mail, teremos prazer em lhe enviar outro.
      </div>

      {status === 'verification-link-sent' && (
        <div className='mb-4 text-sm font-medium text-green-600 dark:text-green-400'>
          Um novo link de verificação foi enviado para o endereço de e-mail que
          você fornecido durante o registro.
        </div>
      )}

      <form onSubmit={submit}>
        <div className='mt-4 flex items-center justify-between'>
          <Button disabled={processing}>Reenviar email de verificação</Button>

          <Link
            href={route('logout')}
            method='post'
            as='button'
            className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'>
            Sair
          </Link>
        </div>
      </form>
    </>
  )
}

// ==============================================
PageVerifyEmail.layout = (page) => (
  <GuestLayout title={titles.verifyEmail} children={page} />
)
