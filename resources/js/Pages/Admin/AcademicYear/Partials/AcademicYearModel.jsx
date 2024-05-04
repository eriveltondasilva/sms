import { Button } from 'flowbite-react'
import { AlertCircle, X } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import Modal from '@/Components/Modal'
import useFormHandler from '@/Hooks/useFormHandler'

// ==============================================
export default function AcademicYearModel({
  isShowed = false,
  handleToggleModal = () => {},
  academicYear = {},
}) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.academic-years.update-status',
    params: { academicYear },
  }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <Modal show={isShowed} onClose={handleToggleModal}>
      <form onSubmit={handleSubmit} className='p-6'>
        <h2
          className={twJoin(
            'text-lg font-medium text-gray-900 dark:text-gray-100'
          )}>
          Título
        </h2>
        <p className={twJoin('mt-1 text-sm text-gray-600 dark:text-gray-400')}>
          subtítulo
        </p>

        <div className='mt-6 flex justify-end'>
          <Button
            color='light'
            onClick={handleToggleModal}
            disabled={isLoading}>
            <X className='mr-2 h-5 w-5' />
            cancelar
          </Button>

          <div className='ms-3'>
            <Button
              type='submit'
              color='failure'
              onClick={handleToggleModal}
              disabled={isLoading}>
              <AlertCircle className='mr-2 h-5 w-5' />
              confirmar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
