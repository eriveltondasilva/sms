import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export function PageContainer({ children, className }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex h-full max-w-5xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-8 py-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
