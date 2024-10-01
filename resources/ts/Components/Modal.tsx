import { Modal as FlowbiteModal } from 'flowbite-react'

function ModalTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
      {children}
    </h2>
  )
}

function ModalText({ children }: { children: React.ReactNode }) {
  return (
    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{children}</p>
  )
}

export const Modal = Object.assign(FlowbiteModal, {
  Title: ModalTitle,
  Text: ModalText,
})
