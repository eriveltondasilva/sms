import { type ModalProps, Modal } from 'flowbite-react'
import { CircleAlert } from 'lucide-react'

type PopupRootProps = {
  children: React.ReactNode
} & ModalProps

function PopupRoot({ children, ...props }: PopupRootProps) {
  return (
    <Modal
      {...props}
      popup
    >
      <Modal.Header />
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

function PopupTitle({ children }: { children: string }) {
  return (
    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
      {children}
    </h2>
  )
}

function PopupText({ children }: { children: string }) {
  return (
    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
      {children}
    </h3>
  )
}

function PopupIcon() {
  return (
    <CircleAlert className='mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200' />
  )
}

function PopupFooter({ children }: { children: React.ReactNode }) {
  return <div className='flex justify-center gap-4'>{children}</div>
}

export const Popup = Object.assign(PopupRoot, {
  Title: PopupTitle,
  Text: PopupText,
  Icon: PopupIcon,
  Footer: PopupFooter,
})
