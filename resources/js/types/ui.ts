import type { BreadcrumbItem } from './navigation'
import type { PropsWithChildren } from 'react'

export interface AppLayoutProps extends PropsWithChildren {
  breadcrumbs?: BreadcrumbItem[]
}

export interface AuthLayoutProps extends PropsWithChildren {
  title?: string
  description?: string
}

export interface PaginatedData<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  prev_page_url: string | null
}