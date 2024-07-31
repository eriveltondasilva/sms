import AuthLayout from '@/Layouts/AuthLayout'
import { breadcrumbs, titles } from './data'

//
export default function Index() {
  return null
}

//
Index.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
