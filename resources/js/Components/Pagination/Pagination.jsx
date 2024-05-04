import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PaginationRoot({ children }) {
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

export function PaginationLeft({ from = 0, to = 0, total = 0 }) {
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

export function PaginationRight({ children }) {
  return <ul className='inline-flex items-stretch -space-x-px'>{children}</ul>
}

export function PaginationPrevious({ href = '' }) {
  return (
    <li>
      <Link
        href={href}
        className='ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        disabled={href !== ''}>
        <span className='sr-only'>Previous</span>
        <ChevronLeft className='h-5 w-5' />
      </Link>
    </li>
  )
}
export function PaginationNext({ href = '' }) {
  return (
    <li>
      <Link
        href={href}
        className='flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        disabled={href === ''}>
        <span className='sr-only'>Next</span>
        <ChevronRight className='h-5 w-5' />
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

//           <li>
//             <a href="#"
//                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//               <span class="sr-only">Previous</span>
//               <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
//                    xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd"
//                       d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                       clip-rule="evenodd"></path>
//               </svg>
//             </a>
//           </li>

//           <li>
//             <a href="#"
//                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
//           </li>
//           <li>
//             <a href="#" aria-current="page"
//                class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//           </li>
//           <li>
//             <a href="#"
//                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
//           </li>
//           <li>
//             <a href="#"
//                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
//           </li>
//           <li>
//             <a href="#"
//                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//               <span class="sr-only">Next</span>
//               <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
//                    xmlns="http://www.w3.org/2000/svg">
//                 <path fill-rule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clip-rule="evenodd"></path>
//               </svg>
//             </a>
//           </li>
