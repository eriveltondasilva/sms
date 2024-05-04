// prettier-ignore
export const titles = {
  dashboard: 'Painel',
  calendar : 'Calendário',
}

// ------------------------------------
const baseBreadcrumb = [{ title: titles.dashboard, route: 'dashboard' }]

// prettier-ignore
export const breadcrumbs = {
  dashboard: [{ title: titles.dashboard }],
  calendar : [...baseBreadcrumb, { title: titles.calendar }],
}
