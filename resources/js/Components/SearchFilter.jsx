import { twJoin } from 'tailwind-merge'

//
function SearchFilterRoot({ onSubmit, children }) {
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

function SearchFilterLeft({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

function SearchFilterRight({ children }) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

//
export const SearchFilter = Object.assign(SearchFilterRoot, {
  Left: SearchFilterLeft,
  Right: SearchFilterRight,
})
