// prettier-ignore
export const titles = {
  index : 'Selecionar Turma',
}

// prettier-ignore
const baseBreadcrumb = [
  { title: 'Painel', route: 'teacher.dashboard' },
  { title: titles.index, route: 'teacher.groups.index' },
]

// prettier-ignore
export const breadcrumbs = {
  index : [baseBreadcrumb.at(0), { title: titles.index }],
}
