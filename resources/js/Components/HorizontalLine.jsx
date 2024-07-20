import { twJoin } from 'tailwind-merge'

// ==============================================
export default function HorizontalLine({ text = '' }) {
  if (!text) {
    return <hr className='my-2 h-px border-0 bg-gray-200 dark:bg-gray-700' />
  }

  return (
    <div className='inline-flex w-full items-center justify-center'>
      <hr className='my-6 h-px w-full border-0 bg-gray-200 dark:bg-gray-700' />
      <span
        className={twJoin(
          'absolute left-1/2 -translate-x-1/2 px-3 font-medium',
          'text-gray-900 dark:bg-gray-800 dark:text-white'
        )}>
        {text}
      </span>
    </div>
  )
}
