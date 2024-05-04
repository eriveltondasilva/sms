// prettier-ignore
export const titles = {
  dashboard: 'Painel',
  calendar : 'Calendário',
}

// ------------------------------------
// prettier-ignore
const baseBreadcrumb = [
  { title: titles.dashboard, route: 'admin.dashboard' }
]

// prettier-ignore
export const breadcrumbs = {
  dashboard: [{ title: titles.dashboard }],
  calendar : [...baseBreadcrumb, { title: titles.calendar }],
}
