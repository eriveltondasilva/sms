import { Link } from '@inertiajs/react'
import { Breadcrumb as FlowbiteBreadcrumb } from 'flowbite-react'
import { Home } from 'lucide-react'

function BreadcrumbRoot({ children }: React.PropsWithChildren) {
  return (
    <FlowbiteBreadcrumb aria-label='breadcrumb'>{children}</FlowbiteBreadcrumb>
  )
}

type BreadcrumbItemProps = {
  item: {
    title: string
    route?: string
  }
}

function BreadcrumbItem({ item }: BreadcrumbItemProps) {
  const IconComponent = item.title === 'Painel' && Home
  const displayTitle = item.title.toLowerCase()

  return (
    <FlowbiteBreadcrumb.Item icon={IconComponent || undefined}>
      {item.route ?
        <Link href={route(item.route)}>{displayTitle}</Link>
      : displayTitle}
    </FlowbiteBreadcrumb.Item>
  )
}

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
})
