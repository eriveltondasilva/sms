// import Calendar from '@/Components/Calendar'
import { Alert } from '@/Components/Alert'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

//
export default function Dashboard() {
  return (
    <Alert
      color='danger'
      icon=''>
      Alguma coisa deu errado. Você não tem permissão para acessar esta página.
    </Alert>
  )
}

//
Dashboard.layout = (page) => (
  <AuthLayout
    title={titles.dashboard}
    breadcrumb={breadcrumbs.dashboard}
    children={page}
  />
)
