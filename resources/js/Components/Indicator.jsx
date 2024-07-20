import { twJoin } from 'tailwind-merge'

// ====================================
export default function Indicator({ type = 'secondary' }) {
  const colorsMap = {
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
  }[type]

  return (
    <span
      className={twJoin(
        'absolute right-4 top-6',
        'flex h-6 w-6 rounded-full drop-shadow',
        colorsMap
      )}></span>
  )
}
