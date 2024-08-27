import { twJoin } from 'tailwind-merge'
import { type LucideIcon } from 'lucide-react'

function StatCardRoot({ children }: { children: React.ReactNode }) {
  return (
    <li
      className={twJoin(
        'flex items-center rounded-lg shadow-md',
        'space-x-2 px-2 py-1.5 sm:space-x-4 sm:px-4 sm:py-3',
        'bg-gray-50 text-gray-800',
        'dark:bg-gray-800 dark:text-gray-100',
      )}
    >
      {children}
    </li>
  )
}

function StatCardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className={twJoin(
        'flex justify-end rounded-full p-3.5',
        'bg-gray-200 dark:bg-gray-900',
      )}
    >
      <Icon />
    </div>
  )
}

function StatCardContent({ children }: { children: React.ReactNode }) {
  return <dl className='flex flex-col'>{children}</dl>
}

function StatCardTitle({ title }: { title: string }) {
  return <dt className='text-md tracking-tight sm:tracking-normal'>{title}</dt>
}

function StatCardValue({ value }: { value: number }) {
  return (
    <dd className='text-lg font-bold tracking-widest sm:text-xl'>{value}</dd>
  )
}

export const StatCard = Object.assign(StatCardRoot, {
  Content: StatCardContent,
  Icon: StatCardIcon,
  Title: StatCardTitle,
  Value: StatCardValue,
})
