import type { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar alunos',
  create: 'Adicionar aluno',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar turmas', route: 'admin.groups.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [...baseBreadcrumb, { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
} as const
