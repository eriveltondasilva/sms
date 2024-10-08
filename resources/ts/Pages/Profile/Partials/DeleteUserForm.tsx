import { useForm } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Lock, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { Input } from '@/Components/Input'
import { Modal } from '@/Components/Modal'

import type { DeleteUserFormProps } from './types'

export default function DeleteUserForm({ className }: DeleteUserFormProps) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  })

  const confirmUserDeletion = () => setConfirmingUserDeletion(true)

  const deleteUser = (e: React.SyntheticEvent) => {
    e.preventDefault()
    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)
    reset()
  }

  return (
    <section className={twJoin('space-y-6', className)}>
      <header>
        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Deletar Conta
        </h2>

        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Depois que sua conta for excluída, todos os seus recursos e dados
          serão excluído permanentemente. Antes de excluir sua conta, baixe
          qualquer dados ou informações que você deseja reter.
        </p>
      </header>

      <Button
        color='failure'
        onClick={confirmUserDeletion}
      >
        <Trash2 className='mr-2 size-5' />
        Deletar Conta
      </Button>

      {/* model */}
      <Modal
        show={confirmingUserDeletion}
        onClose={closeModal}
      >
        <form
          onSubmit={deleteUser}
          className='p-6'
        >
          <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Você tem certeza que deseja deletar sua conta?
          </h2>

          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            Depois que sua conta for excluída, todos os seus recursos e dados
            serão excluído permanentemente. Por favor, digite sua senha para
            confirmar que você faria gostaria de excluir permanentemente sua
            conta.
          </p>
          <div className='mt-6'>
            <Input.Text
              id='password'
              type='password'
              label='Senha'
              className='mt-1 block'
              placeholder='sua senha...'
              icon={Lock}
              value={data.password}
              error={errors?.password}
              onChange={(e) => setData('password', e.target.value)}
              autoFocus
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <Button
              outline
              color='blue'
              onClick={closeModal}
            >
              Cancelar
            </Button>

            <div className='ms-3'>
              <Button
                type='submit'
                color='failure'
                disabled={processing}
              >
                Deletar Conta
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  )
}
