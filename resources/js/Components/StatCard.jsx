import { twJoin } from 'tailwind-merge'

//
function StatCardRoot({ children }) {
  return (
    <li
      className={twJoin(
        'flex items-center space-x-3',
        'rounded-lg px-4 py-3 shadow-md',
        'bg-gray-50 text-gray-800',
        'dark:bg-gray-800 dark:text-gray-100'
      )}
    >
      {children}
    </li>
  )
}

function StatCardIcon({ icon }) {
  return (
    <div
      className={twJoin(
        'flex justify-end rounded-full',
        'bg-gray-200 p-3.5 dark:bg-gray-900'
      )}
    >
      {icon}
    </div>
  )
}

function StatCardContent({ children }) {
  return <dl className='flex flex-col'>{children}</dl>
}

function StatCardTitle({ title = '' }) {
  return <dt className='text-md tracking-tight'>{title}</dt>
}

function StatCardValue({ value = 0 }) {
  return <dd className='text-xl font-extrabold tracking-widest'>{value}</dd>
}

//
export const StatCard = Object.assign(StatCardRoot, {
  Icon: StatCardIcon,
  Content: StatCardContent,
  Title: StatCardTitle,
  Value: StatCardValue,
})
