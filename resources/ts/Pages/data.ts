import type { BreadcrumbItem } from '@/Types'

export const titles = {
  dashboard: 'Painel',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: titles.dashboard, route: 'dashboard' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  dashboard: [{ title: titles.dashboard }],
} as const
