import { twJoin } from 'tailwind-merge'

// ====================================
export function SearchbarRoot({ onSubmit, children }) {
  return (
    <form onSubmit={onSubmit}>
      <div
        className={twJoin(
          'flex flex-col items-center justify-between',
          'space-y-3 py-6 md:flex-row md:space-x-4 md:space-y-0'
        )}>
        {children}
      </div>
    </form>
  )
}

// ====================================
export function SearchbarLeft({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

// ====================================
export function SearchbarRight({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}
