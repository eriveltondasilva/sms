import Heading from '@/components/heading'

import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className='flex items-start justify-between gap-4 mb-8'>
      <Heading as='h1' title={title} description={description} />
      {actions && (
        <div className='flex shrink-0 items-center gap-2'>{actions}</div>
      )}
    </div>
  )
}
