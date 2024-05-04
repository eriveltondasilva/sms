// prettier-ignore
export const titles = {
  index : 'Listar anos letivos',
  create: 'Cadastrar ano letivo',
  edit  : 'Editar ano letivo',
  show  : 'Visualizar ano letivo',
}

// ------------------------------------
const baseBreadcrumb = [
  { title: 'Painel', route: 'admin.dashboard' },
  { title: titles.index, route: 'admin.academic-years.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [baseBreadcrumb[0], { title: titles.index }],
  create: [...baseBreadcrumb, { title: titles.create }],
  edit  : [...baseBreadcrumb, { title: titles.edit }],
  show  : [...baseBreadcrumb, { title: titles.show }],
}
