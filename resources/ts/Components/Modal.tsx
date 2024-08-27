import { Modal as FlowbiteModal } from 'flowbite-react'
import { CircleAlert } from 'lucide-react'
import React from 'react'

function ModalPopup({ children }: React.PropsWithChildren) {
  return (
    <>
      <FlowbiteModal.Header />
      <FlowbiteModal.Body>
        <div className='text-center'>{children}</div>
      </FlowbiteModal.Body>
    </>
  )
}

function ModalPopupIcon() {
  return (
    <CircleAlert className='mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200' />
  )
}

function ModalPopupText({ children }: React.PropsWithChildren) {
  return (
    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
      {children}
    </h3>
  )
}

function ModalPopupFooter({ children }: React.PropsWithChildren) {
  return <div className='flex justify-center gap-4'>{children}</div>
}

function ModalTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
      {children}
    </h2>
  )
}

function ModalText({ children }: React.PropsWithChildren) {
  return (
    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{children}</p>
  )
}

export const Modal = Object.assign(FlowbiteModal, {
  Title: ModalTitle,
  Text: ModalText,
  Popup: ModalPopup,
  PopupFooter: ModalPopupFooter,
  PopupIcon: ModalPopupIcon,
  PopupText: ModalPopupText,
})
