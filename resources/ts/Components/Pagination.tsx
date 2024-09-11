import { InertiaLinkProps, Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

function PaginationRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={twJoin(
        'relative overflow-hidden rounded-b-lg shadow-md',
        'bg-white dark:bg-gray-800',
      )}
    >
      <nav
        className={twJoin(
          'flex flex-col items-start justify-between',
          'space-y-3 p-4 md:flex-row md:items-center md:space-y-0',
        )}
        aria-label='Table navigation'
      >
        {children}
      </nav>
    </div>
  )
}

function PaginationLeft({
  from = 0,
  to = 0,
  total = 0,
}: {
  from: number
  to: number
  total: number
}) {
  const className = 'font-semibold text-gray-900 dark:text-white'

  return (
    <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>
      Exibindo&nbsp;
      <span className={className}>
        {from} - {to}&nbsp;
      </span>
      de <span className={className}>{total}</span>
    </div>
  )
}

function PaginationRight({ children }: { children: React.ReactNode }) {
  return <ul className='inline-flex items-stretch -space-x-px'>{children}</ul>
}

function PaginationPrevious({ href = '' }: { href?: string }) {
  return (
    <li>
      <Link
        as='button'
        type='button'
        href={href}
        className={twJoin(
          'flex h-full items-center justify-center',
          'ml-0 rounded-l-lg border px-3 py-1.5',
          'border-gray-300 bg-white text-gray-500',
          'hover:bg-gray-100 hover:text-gray-700',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
          'dark:hover:bg-gray-700 dark:hover:text-white',
          !href && 'cursor-not-allowed opacity-25',
        )}
        disabled={!href}
      >
        <span className='sr-only'>Anterior</span>
        <ChevronLeft className='size-5' />
      </Link>
    </li>
  )
}

function PaginationNext({ href = '' }: { href?: string }) {
  return (
    <li>
      <Link
        as='button'
        type='button'
        href={href}
        className={twJoin(
          'flex h-full items-center justify-center',
          'rounded-r-lg border px-3 py-1.5 leading-tight',
          'border-gray-300 bg-white text-gray-500',
          'hover:bg-gray-100 hover:text-gray-700',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
          'dark:hover:bg-gray-700 dark:hover:text-white',
          !href && 'cursor-not-allowed opacity-25',
        )}
        disabled={!href}
      >
        <span className='sr-only'>Próximo</span>
        <ChevronRight className='size-5' />
      </Link>
    </li>
  )
}

function PaginationItem({
  children,
  ...props
}: { children: React.ReactNode } & InertiaLinkProps) {
  return (
    <li>
      <Link
        className={twJoin(
          'flex items-center justify-center',
          'border px-3 py-2 text-sm leading-tight',
          'border-gray-300 bg-white text-gray-500',
          'hover:bg-gray-100 hover:text-gray-700',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
          'dark:hover:bg-gray-700 dark:hover:text-white',
        )}
        {...props}
      >
        {children}
      </Link>
    </li>
  )
}

export const Pagination = Object.assign(PaginationRoot, {
  Left: PaginationLeft,
  Right: PaginationRight,
  Item: PaginationItem,
  Previous: PaginationPrevious,
  Next: PaginationNext,
})
