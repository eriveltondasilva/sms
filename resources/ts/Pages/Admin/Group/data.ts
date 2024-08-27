import type { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar turmas',
  create: 'Cadastrar turma',
  edit: 'Editar turma',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.groups.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [baseBreadcrumb[0], { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit: [...baseBreadcrumb, { title: titles.edit }],
} as const
