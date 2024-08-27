import { BreadcrumbItem } from '@/Types'

export const titles = {
  index: 'Listar professores',
  create: 'Cadastrar professores',
  edit: 'Editar professores',
  show: 'Visualizar professores',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.teachers.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  index: [baseBreadcrumb[0], { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit: [...baseBreadcrumb, { title: titles.edit }],
  show: [...baseBreadcrumb, { title: titles.show }],
}
