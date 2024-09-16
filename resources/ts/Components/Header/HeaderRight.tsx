import { Badge, DarkThemeToggle } from 'flowbite-react'
import { twJoin } from 'tailwind-merge'

import type { HeaderRightProps } from './types'

export function HeaderRight({ activeYear, children }: HeaderRightProps) {
  return (
    <div className='flex items-center space-x-2'>
      <span
        className={twJoin(
          'text-sm font-medium',
          'text-gray-600 dark:text-gray-400',
        )}
      >
        Ano Letivo:
      </span>
      <Badge
        color='failure'
        size='sm'
      >
        {activeYear}
      </Badge>

      {/* Botão tema escuro */}
      <DarkThemeToggle />
      {children}
    </div>
  )
}
