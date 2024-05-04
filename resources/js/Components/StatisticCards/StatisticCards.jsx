import { twJoin } from 'tailwind-merge'

// =========================================================
export function StatisticCardsRoot({ children }) {
  return (
    <section className='grid gap-4 xs:grid-cols-2 lg:grid-cols-4'>
      {children}
    </section>
  )
}

export function StatisticCardsItem({ children }) {
  return (
    <div
      className={twJoin(
        'flex items-center',
        'space-x-2 rounded-lg px-2 py-3 shadow-md',
        'bg-gray-50 text-gray-800',
        'dark:bg-gray-800 dark:text-gray-100'
      )}>
      {children}
    </div>
  )
}

export function StatisticCardsIcon({ icon }) {
  return (
    <div className='flex justify-end'>
      <div className='rounded-full bg-gray-200 p-3.5 dark:bg-gray-900'>
        {icon}
      </div>
    </div>
  )
}

export function StatisticCardsBody({ value = '', title = '' }) {
  return (
    <div className='flex-col'>
      <p className='text-xl font-extrabold tracking-widest'>{value}</p>
      <p className='text-md tracking-tight'>{title}</p>
    </div>
  )
}
