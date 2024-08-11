import { Button, Modal } from 'flowbite-react'
import { AlertCircle, TriangleAlert, X } from 'lucide-react'

import { useActionHandler } from '@/Hooks/useActionHandler'

//
export default function SchoolYearModel({
  show = false,
  schoolYear = {},
  onClose = () => {},
}) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.school-years.update-status',
  }
  const { handleAction, isLoading } = useActionHandler(formOptions)

  const handleClose = () => onClose(false)
  const handleConfirm = () => {
    handleAction({ schoolYear })
    handleClose()
  }

  return (
    <Modal
      size='sm'
      show={show}
      onClose={handleClose}>
      <Modal.Body>
        <div className='text-center'>
          <h3 className='mb-5 flex text-lg font-normal text-gray-500 dark:text-gray-400'>
            <TriangleAlert className='mr-2' />
            Lorem ipsum dolor...
          </h3>
          <div className='flex justify-center gap-4'>
            <Button
              type='button'
              color='failure'
              onClick={handleConfirm}
              disabled={isLoading}>
              <AlertCircle className='mr-2 size-5' />
              Confirmar
            </Button>
            <Button
              type='button'
              color='gray'
              onClick={handleClose}
              disabled={isLoading}>
              <X className='mr-2 size-5' />
              Cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
