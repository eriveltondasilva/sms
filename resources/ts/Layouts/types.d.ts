import type { BreadcrumbItem, Stats } from '@/Types'

export type AuthLayoutProps = {
  title: string
  breadcrumb: BreadcrumbItem[]
  stats?: Stats[]
  children: React.ReactNode
}

export type GuestLayoutProps = {
  title: string
  children: React.ReactNode
}
