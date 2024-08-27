import { AuthLayout } from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

export default function PageTeacherIndex() {
  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      teste teste teste
    </AuthLayout>
  )
}
