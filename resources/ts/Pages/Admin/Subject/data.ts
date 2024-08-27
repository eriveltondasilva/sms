import { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar disciplinas',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.subjects.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [baseBreadcrumb[0], { title: titles.index }],
}
