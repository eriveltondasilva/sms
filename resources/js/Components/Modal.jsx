import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { twJoin } from 'tailwind-merge'

export default function Modal({
  children,
  show = false,
  maxWidth = 'lg',
  closeable = true,
  onClose = () => {},
}) {
  const close = () => {
    if (closeable) {
      onClose()
    }
  }

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth]

  return (
    <Transition show={show} as={Fragment} leave='duration-200'>
      <Dialog
        as='div'
        id='modal'
        className='fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0'
        onClose={close}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
          <Dialog.Panel
            className={twJoin(
              'mb-6 sm:mx-auto sm:w-full',
              'transform overflow-hidden rounded-lg shadow-xl transition-all',
              'bg-white dark:bg-gray-800',
              maxWidthClass
            )}>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
