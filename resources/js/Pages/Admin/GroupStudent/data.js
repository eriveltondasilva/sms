// prettier-ignore
export const titles = {
  index : 'Listar alunos',
  create: 'Adicionar aluno',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar turmas', route: 'admin.groups.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [...baseBreadcrumb, { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
}
