import type { BreadcrumbItem } from '@/Types'

export const titles = {
  dashboard: 'Painel',
  calendar: 'Calendário',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: titles.dashboard, route: 'dashboard' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  dashboard: [{ title: titles.dashboard }],
  calendar: [...baseBreadcrumb, { title: titles.calendar }],
} as const
