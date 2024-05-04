// prettier-ignore
export const titles = {
  index: 'Listar disciplinas',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.subjects.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index: [baseBreadcrumb.at(0), { title: titles.index }],
}
