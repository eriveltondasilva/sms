import { twJoin } from 'tailwind-merge'

const colorsMap = {
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-500',
} as const

export function Indicator({
  type = 'secondary',
}: {
  type?: keyof typeof colorsMap
}) {
  const color = colorsMap[type]

  return (
    <span
      className={twJoin(
        'absolute right-4 top-6',
        'flex size-6 rounded-full drop-shadow',
        color,
      )}
    ></span>
  )
}
