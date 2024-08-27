import { twJoin } from 'tailwind-merge'

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function SearchBarRoot({ onSubmit, children }: React.PropsWithChildren<Props>) {
  return (
    <form
      onSubmit={onSubmit}
      className={twJoin(
        'flex flex-col items-center justify-between md:flex-row',
        'space-y-3 pb-4 md:space-x-4 md:space-y-0',
      )}
    >
      {children}
    </form>
  )
}

function SearchBarLeft({ children }: React.PropsWithChildren) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

function SearchBarRight({ children }: React.PropsWithChildren) {
  return (
    <div className='flex w-full items-center space-x-3 md:w-auto'>
      {children}
    </div>
  )
}

export const SearchBar = Object.assign(SearchBarRoot, {
  Left: SearchBarLeft,
  Right: SearchBarRight,
})
