// prettier-ignore
export const titles = {
  index : 'Listar alunos',
  create: 'Cadastrar aluno',
  edit  : 'Editar aluno',
  show  : 'Visualizar aluno',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.students.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [baseBreadcrumb.at(0), { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit  : [...baseBreadcrumb, { title: titles.edit }],
  show  : [...baseBreadcrumb, { title: titles.show }],
}
