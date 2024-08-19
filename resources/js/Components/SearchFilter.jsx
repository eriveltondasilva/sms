import { twJoin } from 'tailwind-merge'

//
function SearchBarRoot({ onSubmit, children }) {
  return (
    <form onSubmit={onSubmit}>
      <div
        className={twJoin(
          'flex flex-col items-center justify-between md:flex-row',
          'space-y-3 pb-4 md:space-x-4 md:space-y-0'
        )}>
        {children}
      </div>
    </form>
  )
}

function SearchBarLeft({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

function SearchBarRight({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

//
export const SearchBar = Object.assign(SearchBarRoot, {
  Left: SearchBarLeft,
  Right: SearchBarRight,
})
