import { Link } from '@inertiajs/react'
import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

//
function SidebarRoot({ className, children, ...props }) {
  return (
    <FlowbiteSidebar
      className={twMerge('fixed z-20 h-dvh', className)}
      as='aside'
      {...props}>
      {children}
    </FlowbiteSidebar>
  )
}

function SidebarTriggerClose({ onClick = () => {} }) {
  return (
    <button
      type='button'
      className='absolute -right-6 top-1 p-2 text-white'
      onClick={onClick}>
      <X className='size-8' />
    </button>
  )
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
              onClick={onClose}>
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
  Logo: FlowbiteSidebar.Logo,
  Menu: SidebarMenu,
  TriggerClose: SidebarTriggerClose,
})
