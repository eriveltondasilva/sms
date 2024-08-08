import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

//
function PaginationRoot({ children }) {
  return (
    <div className='relative overflow-hidden rounded-b-lg bg-white shadow-md dark:bg-gray-800'>
      <nav
        className='flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0'
        aria-label='Table navigation'>
        {children}
      </nav>
    </div>
  )
}

function PaginationLeft({ from = 0, to = 0, total = 0 }) {
  return (
    <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
      Exibindo{' '}
      <span className='font-semibold text-gray-900 dark:text-white'>
        {from}-{to}{' '}
      </span>
      de{' '}
      <span className='font-semibold text-gray-900 dark:text-white'>
        {total}
      </span>
    </span>
  )
}

function PaginationRight({ children }) {
  return <ul className='inline-flex items-stretch -space-x-px'>{children}</ul>
}

function PaginationPrevious({ href = '' }) {
  return (
    <li>
      <Link
        href={href}
        className='ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        disabled={href !== ''}>
        <span className='sr-only'>Previous</span>
        <ChevronLeft className='size-5' />
      </Link>
    </li>
  )
}
function PaginationNext({ href = '' }) {
  return (
    <li>
      <Link
        href={href}
        className='flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        disabled={href === ''}>
        <span className='sr-only'>Next</span>
        <ChevronRight className='size-5' />
      </Link>
    </li>
  )
}

function PaginationItem({ href = '' }) {
  return (
    <li>
      <a
        href={href}
        className='flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
        1
      </a>
    </li>
  )
}

//
export const Pagination = Object.assign(PaginationRoot, {
  Left: PaginationLeft,
  Right: PaginationRight,
  Previous: PaginationPrevious,
  Next: PaginationNext,
})
