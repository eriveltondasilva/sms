import type { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Selecionar Turma',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'teacher.dashboard' },
  { title: titles.index, route: 'teacher.groups.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [baseBreadcrumb[0], { title: titles.index }],
}
