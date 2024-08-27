import type { BreadcrumbItem } from '@/Types'

export const titles = {
  create: 'Cadastrar usuário',
  edit: 'Editar usuário',
}

const baseBreadcrumb: BreadcrumbItem[] = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar professores', route: 'admin.teachers.index' },
]

export const breadcrumbs: Record<keyof typeof titles, BreadcrumbItem[]> = {
  create: [...baseBreadcrumb, { title: titles.create }],
  edit: [...baseBreadcrumb, { title: titles.edit }],
}
