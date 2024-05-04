// prettier-ignore
export const titles = {
  index : 'Listar professores',
  create: 'Adicionar professor',
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
