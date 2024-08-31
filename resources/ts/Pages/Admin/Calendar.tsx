import { AuthLayout } from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

export default function CalendarPage() {
  return (
    <AuthLayout
      title={titles.calendar}
      breadcrumb={breadcrumbs.calendar}
    ></AuthLayout>
  )
}
