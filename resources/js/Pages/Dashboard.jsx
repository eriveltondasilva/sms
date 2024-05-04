// import Calendar from '@/Components/Calendar'
import { usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

// ====================================
export default function DashboardPage() {
  const { message } = usePage().props.flash

  return <>{message && <Alert>{message}</Alert>}</>
}

// ====================================
DashboardPage.layout = (page) => (
  <AuthLayout title={titles.dashboard} breadcrumb={breadcrumbs.dashboard}>
    {page}
  </AuthLayout>
)
