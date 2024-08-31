import { AuthLayout } from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

export default function Calendar() {
  return (
    <AuthLayout
      title={titles.calendar}
      breadcrumb={breadcrumbs.calendar}
    >
      Calendário
    </AuthLayout>
  )
}
