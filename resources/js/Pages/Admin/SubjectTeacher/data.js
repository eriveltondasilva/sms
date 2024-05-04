// prettier-ignore
export const titles = {
  index : 'Listar professors',
  create: 'Adicionar professor',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: 'Listar disciplinas', route: 'admin.subjects.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [...baseBreadcrumb, { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
}
