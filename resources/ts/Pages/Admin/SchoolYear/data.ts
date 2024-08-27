import { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar anos letivos',
  create: 'Cadastrar ano letivo',
  edit: 'Editar ano letivo',
  show: 'Visualizar ano letivo',
} as const

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.school-years.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [baseBreadcrumb[0], { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit: [...baseBreadcrumb, { title: titles.edit }],
  show: [...baseBreadcrumb, { title: titles.show }],
} as const
