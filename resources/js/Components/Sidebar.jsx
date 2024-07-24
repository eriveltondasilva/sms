import { Link } from '@inertiajs/react'
import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

//
function SidebarRoot({ className, isCollapsed, children }) {
  return (
    <aside
      id='sidebar'
      aria-label='sidebar'
      className={twMerge('max-h-dvh', className)}
    >
      <FlowbiteSidebar collapsed={isCollapsed}>{children}</FlowbiteSidebar>
    </aside>
  )
}

function SidebarLogo({ children, ...props }) {
  return <FlowbiteSidebar.Logo {...props}>{children}</FlowbiteSidebar.Logo>
}

function SidebarMenu({ items = [], onClose = () => {} }) {
  if (!items.length > 0) return null

  return (
    <FlowbiteSidebar.Items>
      {items.map((group, index) => (
        <FlowbiteSidebar.ItemGroup key={`sidebar-group-${index}`}>
          {group.map((item, index) => (
            <FlowbiteSidebar.Item
              key={`sidebar-item-${index}`}
              icon={item.icon}
              as={Link}
              href={route(item.route)}
              active={route().current(item.route)}
              onClick={onClose}
            >
              {item.title}
            </FlowbiteSidebar.Item>
          ))}
        </FlowbiteSidebar.ItemGroup>
      ))}
    </FlowbiteSidebar.Items>
  )
}

//
export const Sidebar = Object.assign(SidebarRoot, {
  Logo: SidebarLogo,
  Menu: SidebarMenu,
})
