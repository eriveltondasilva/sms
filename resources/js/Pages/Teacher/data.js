// prettier-ignore
export const titles = {
  dashboard: 'Painel',
  calendar : 'Calendário',
}

// ------------------------------------
const baseBreadcrumb = [{ title: titles.dashboard, route: 'teacher.dashboard' }]

// prettier-ignore
export const breadcrumbs = {
  dashboard: [{ title: titles.dashboard }],
  calendar : [...baseBreadcrumb, { title: titles.calendar }],
}
