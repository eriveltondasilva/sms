import { Card } from 'flowbite-react'
import { twJoin, twMerge } from 'tailwind-merge'

//
function StatCardRoot({ className, children }) {
  return (
    <section
      className={twMerge('grid gap-4 xs:grid-cols-2 lg:grid-cols-4', className)}
    >
      {children}
    </section>
  )
}

function StatCardItem() {
  return <Card></Card>
}

function StatCardBody() {
  return
}

function StatCardIcon() {
  return
}

function StatCardTitle() {
  return
}

function StatCardValue() {
  return
}

//
function StatCardsRoot({ children }) {
  return (
    <section className='grid gap-4 xs:grid-cols-2 lg:grid-cols-4'>
      {children}
    </section>
  )
}

function StatCardsItem({ children }) {
  return (
    <div
      className={twJoin(
        'flex items-center space-x-2 rounded-lg px-2 py-3 shadow-md',
        'bg-gray-50 text-gray-800',
        'dark:bg-gray-800 dark:text-gray-100'
      )}
    >
      {children}
    </div>
  )
}

function StatCardsIcon({ children }) {
  return (
    <div className='flex justify-end'>
      <div className='rounded-full bg-gray-200 p-3.5 dark:bg-gray-900'>
        {children}
      </div>
    </div>
  )
}

function StatCardsBody({ value = '', title = '' }) {
  return (
    <dl className='flex flex-col'>
      <dd className='text-xl font-extrabold tracking-widest'>{value}</dd>
      <dt className='text-md tracking-tight'>{title}</dt>
    </dl>
  )
}

//
export const StatCards = Object.assign(StatCardsRoot, {
  Icon: StatCardsIcon,
  Item: StatCardsItem,
  Body: StatCardsBody,
})
