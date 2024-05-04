import { Link } from '@inertiajs/react'
import { Breadcrumb } from 'flowbite-react'
import { Home } from 'lucide-react'

// ===================================
export function BreadcrumbRoot({ children }) {
  return <Breadcrumb aria-label='breadcrumb'>{children}</Breadcrumb>
}

// ===================================
export function BreadcrumbItem({ item }) {
  const { title, route: routeName } = item || {}
  const icon = title === 'Painel' && Home
  const lowerCaseTitle = title?.toLowerCase()

  return (
    <Breadcrumb.Item icon={icon}>
      {!routeName && lowerCaseTitle}
      {routeName && <Link href={route(routeName)}>{lowerCaseTitle}</Link>}
    </Breadcrumb.Item>
  )
}
