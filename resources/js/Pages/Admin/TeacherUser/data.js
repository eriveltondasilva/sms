// prettier-ignore
export const titles = {
  create: 'Cadastrar usuário',
  edit  : 'Editar usuário',
}

// prettier-ignore
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar professores', route: 'admin.teachers.index' },
]

// prettier-ignore
export const breadcrumbs = {
  create: [...baseBreadcrumb, { title: titles.create }],
  edit  : [...baseBreadcrumb, { title: titles.edit }],
}
