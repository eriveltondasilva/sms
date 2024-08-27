import { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar professors',
  create: 'Adicionar professor',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar disciplinas', route: 'admin.subjects.index' },
]

export const breadcrumbs: Record<string, BreadcrumbItem[]> = {
  index: [...baseBreadcrumb, { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
}
