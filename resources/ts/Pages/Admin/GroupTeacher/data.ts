import { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar professores',
  create: 'Adicionar professor',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar turmas', route: 'admin.groups.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [...baseBreadcrumb, { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
} as const
