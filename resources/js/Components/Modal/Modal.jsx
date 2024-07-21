import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'

//
export function Modal({ show, onClose, children }) {
  console.log('teste')
  return (
    <Dialog
      open={show}
      onClose={onClose}
      className='relative z-50'>
      <DialogBackdrop
        transition
        className={twJoin(
          'fixed inset-0 bg-opacity-75 transition-opacity',
          'data-[closed]:opacity-0',
          'data-[enter]:duration-300 data-[enter]:ease-out',
          'data-[leave]:duration-200 data-[leave]:ease-in'
        )}
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
            <h1>teste</h1>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
