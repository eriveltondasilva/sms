import type { BreadcrumbItem } from '@/Types'

export const titles = {
  profile: 'Perfil',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'dashboard' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  profile: [...baseBreadcrumb, { title: titles.profile }],
}
