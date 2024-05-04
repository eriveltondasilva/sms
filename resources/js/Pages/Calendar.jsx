import AuthLayout from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

// ====================================
export default function CalendarPage() {
  return null
}

// -----------------------------------
CalendarPage.layout = (page) => (
  <AuthLayout title={titles.calendar} breadcrumb={breadcrumbs.calendar}>
    {page}
  </AuthLayout>
)
