import { twJoin } from 'tailwind-merge'

//
function StatCardRoot({ children }) {
  return (
    <li
      className={twJoin(
        'flex items-center rounded-lg shadow-md',
        'space-x-2 px-2 py-1.5 sm:space-x-4 sm:px-4 sm:py-3',
        'bg-gray-50 text-gray-800',
        'dark:bg-gray-800 dark:text-gray-100'
      )}>
      {children}
    </li>
  )
}

function StatCardIcon({ icon }) {
  return (
    <div
      className={twJoin(
        'flex justify-end rounded-full p-3.5',
        'bg-gray-200 dark:bg-gray-900'
      )}>
      {icon}
    </div>
  )
}

function StatCardContent({ children }) {
  return <dl className='flex flex-col'>{children}</dl>
}

function StatCardTitle({ title = '' }) {
  // tracking-tight
  return <dt className='text-md tracking-tight sm:tracking-normal'>{title}</dt>
}

function StatCardValue({ value = 0 }) {
  return (
    <dd className='text-lg font-bold tracking-widest sm:text-xl'>{value}</dd>
  )
}

//
export const StatCard = Object.assign(StatCardRoot, {
  Icon: StatCardIcon,
  Content: StatCardContent,
  Title: StatCardTitle,
  Value: StatCardValue,
})
