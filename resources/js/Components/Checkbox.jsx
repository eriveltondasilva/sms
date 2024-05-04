import { twJoin } from 'tailwind-merge'

export default function Checkbox({ className = '', ...props }) {
  return (
    <input
      {...props}
      type='checkbox'
      className={twJoin(
        'rounded shadow-sm',
        'border-gray-300 text-indigo-600',
        'focus:ring-indigo-500',
        'dark:border-gray-700 dark:bg-gray-900',
        'dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800',
        className
      )}
    />
  )
}
