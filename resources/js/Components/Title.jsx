import { HR } from 'flowbite-react'

//
function TitleRoot({ children }) {
  return (
    <div className='relative overflow-hidden'>
      <div className='flex-row items-center justify-between space-y-3 py-2 sm:flex sm:space-x-4 sm:space-y-0'>
        {children}
      </div>
      <HR />
    </div>
  )
}

function TitleLeft({ title = '', subtitle = '' }) {
  return (
    <div>
      <h2 className='mr-3 text-xl font-semibold dark:text-white'>{title}</h2>
      {subtitle && (
        <p className='font-semibold text-gray-500 dark:text-gray-400'>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function TitleRight({ children }) {
  return <div className='flex'>{children}</div>
}

//
export const Title = Object.assign(TitleRoot, {
  Left: TitleLeft,
  Right: TitleRight,
})
