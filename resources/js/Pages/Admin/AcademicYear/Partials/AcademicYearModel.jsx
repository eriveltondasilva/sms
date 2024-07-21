import { Button, Modal } from 'flowbite-react'
import { AlertCircle, TriangleAlert, X } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Form } from '@/Components/Form'
import useFormHandler from '@/Hooks/useFormHandler'

export default function AcademicYearModel({
  academicYear = {},
  show = false,
  onClose = () => {},
}) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.academic-years.update-status',
    params: { academicYear: academicYear.id },
  }
  const { handleSubmit: handleSubmitModal, isLoading } =
    useFormHandler(formOptions)

  return (
    <Modal
      show={show}
      size='md'
      onClose={() => onClose(false)}>
      {/* <Modal.Header /> */}
      <Modal.Body>
        <Form
          onSubmit={handleSubmitModal}
          className='text-center'>
          <TriangleAlert className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />

          <h3
            className={twJoin(
              "font-normal', 'text-gray-500 mb-5 text-lg dark:text-gray-400"
            )}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore,
            doloremque?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button
              type='submit'
              color='failure'
              onClick={() => onClose(false)}
              disabled={isLoading}>
              <AlertCircle className='mr-2 size-5' />
              Confirmar
            </Button>
            <Button
              color='gray'
              onClick={() => onClose(false)}
              disabled={isLoading}>
              <X className='mr-2 h-5 w-5' />
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
