import { AuthLayout } from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

//
export default function Calendar() {
  return null
}

//
Calendar.layout = (page) => (
  <AuthLayout
    title={titles.calendar}
    breadcrumb={breadcrumbs.calendar}
    children={page}
  />
)
