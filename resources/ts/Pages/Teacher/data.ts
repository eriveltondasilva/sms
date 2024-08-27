import type { BreadcrumbItem } from '@/Types'

export const titles = {
  dashboard: 'Painel',
  calendar: 'Calendário',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: titles.dashboard, route: 'teacher.dashboard' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  dashboard: [{ title: titles.dashboard }],
  calendar: [...baseBreadcrumb, { title: titles.calendar }],
}
