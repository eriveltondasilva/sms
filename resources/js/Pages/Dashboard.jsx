// import Calendar from '@/Components/Calendar'
import { usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

// ====================================
export default function Dashboard() {
  const { message } = usePage().props.flash

  return <>{message && <Alert>{message}</Alert>}</>
}

// ====================================
Dashboard.layout = (page) => (
  <AuthLayout
    title={titles.dashboard}
    breadcrumb={breadcrumbs.dashboard}
    children={page}
  />
)
