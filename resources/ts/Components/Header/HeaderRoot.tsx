import { Navbar } from 'flowbite-react'
import { twJoin } from 'tailwind-merge'

import type { HeaderRootProps } from './types'

export function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <Navbar
      fluid
      rounded
      className={twJoin(
        'sticky top-0 z-10 rounded-lg',
        'shadow-lg sm:relative',
        'bg-slate-50 dark:text-white',
      )}
    >
      {children}
    </Navbar>
  )
}
