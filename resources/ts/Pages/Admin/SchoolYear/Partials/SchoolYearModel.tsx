import { Button } from 'flowbite-react'
import { AlertCircle, X } from 'lucide-react'

import { Popup } from '@/Components/Popup'
import { useActionHandler } from '@/Hooks/useActionHandler'

import type { SchoolYearModelProps } from '../types'

export default function SchoolYearModel({
  show = false,
  schoolYear,
  onClose,
}: SchoolYearModelProps) {
  const { handleAction, isLoading } = useActionHandler({
    method: 'put',
    route: 'admin.school-years.update-status',
  })

  const handleClose = () => onClose(false)
  const handleConfirm = () => {
    handleAction({ schoolYear })
    handleClose()
  }

  return (
    <Popup
      size='md'
      show={show}
      onClose={handleClose}
      popup
    >
      <Popup.Icon />
      <Popup.Text>
        Tem certeza que deseja alterar o status do ano letivo?
      </Popup.Text>
      <Popup.Footer>
        <Button
          type='button'
          color='gray'
          onClick={handleClose}
          disabled={isLoading}
        >
          <X className='mr-2 size-5' />
          Cancelar
        </Button>
        <Button
          type='button'
          color='failure'
          onClick={handleConfirm}
          disabled={isLoading}
        >
          <AlertCircle className='mr-2 size-5' />
          Confirmar
        </Button>
      </Popup.Footer>
    </Popup>
  )
}
