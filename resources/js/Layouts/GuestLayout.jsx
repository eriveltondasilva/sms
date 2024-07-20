import { Head } from '@inertiajs/react'
import { twJoin } from 'tailwind-merge'

// ==============================================
export default function Guest({ title = '', children }) {
  return (
    <>
      <Head title={title} />
      <div
        className={twJoin(
          'flex flex-col items-center justify-center',
          'min-h-screen',
          'bg-gray-100 dark:bg-gray-900'
        )}>
        {/* TODO: adicionar logo */}
        {/* <div>
        <Link href='/'>
          <AppLogo className='h-20 w-20 fill-current text-gray-500' />
        </Link>
      </div> */}

        <main
          className={twJoin(
            'w-full px-8 py-6 sm:max-w-md',
            'overflow-hidden shadow-md sm:rounded-lg',
            'bg-white dark:bg-gray-800'
          )}>
          <h1 className='text-center text-2xl font-bold text-gray-800 dark:text-white'>
            {title}
          </h1>
          {children}
        </main>
      </div>
    </>
  )
}
