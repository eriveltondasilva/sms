import { AuthLayout } from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

export default function CalendarPage({ children }: React.PropsWithChildren) {
  return (
    <AuthLayout title={titles.calendar} breadcrumb={breadcrumbs.calendar}>
      {children}
    </AuthLayout>
  )
}
