// prettier-ignore
export const titles = {
  index : 'Listar turmas',
  create: 'Cadastrar turma',
  edit  : 'Editar turma',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.groups.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [baseBreadcrumb.at(0), { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit  : [...baseBreadcrumb, { title: titles.edit }],
}
