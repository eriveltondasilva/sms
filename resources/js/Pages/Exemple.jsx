import AuthLayout from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

// ====================================
export default function ExemplePage() {
  return null
}

// -----------------------------------
ExemplePage.layout = (page) => (
  <AuthLayout title={titles.dashboard} breadcrumb={breadcrumbs.dashboard}>
    {page}
  </AuthLayout>
)
