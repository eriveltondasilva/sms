import { Link } from '@inertiajs/react'
import { Breadcrumb as FlowbiteBreadcrumb } from 'flowbite-react'
import { Home } from 'lucide-react'

//
function BreadcrumbRoot({ children }) {
  return (
    <FlowbiteBreadcrumb aria-label='breadcrumb'>{children}</FlowbiteBreadcrumb>
  )
}

function BreadcrumbItem({ item }) {
  const { title, route: routeName } = item || {}
  const icon = title === 'Painel' && Home
  const lowerCaseTitle = title?.toLowerCase()

  return (
    <FlowbiteBreadcrumb.Item icon={icon}>
      {!routeName && lowerCaseTitle}
      {routeName && <Link href={route(routeName)}>{lowerCaseTitle}</Link>}
    </FlowbiteBreadcrumb.Item>
  )
}

//
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
})
