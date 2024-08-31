// import Calendar from '@/Components/Calendar'
import { Alert } from '@/Components/Alert'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

export default function Dashboard() {
  return (
    <AuthLayout
      title={titles.dashboard}
      breadcrumb={breadcrumbs.dashboard}
    >
      <Alert color='failure'>Alguma coisa deu errado.</Alert>
    </AuthLayout>
  )
}
