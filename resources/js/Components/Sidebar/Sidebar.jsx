import { Link } from '@inertiajs/react'
import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import { Menu, X } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

// ===============================================
export function SidebarRoot({ children }) {
  return (
    <aside
      id='sidebar'
      aria-label='sidebar'
      className={twJoin(
        'fixed h-screen w-64',
        'left-0 top-0 z-40 ',
        '-translate-x-full transition-transform md:translate-x-0'
      )}>
      <FlowbiteSidebar className='shadow-md' aria-label='sidebar'>
        {children}
      </FlowbiteSidebar>
    </aside>
  )
}

// -----------------------------------------------
export function SidebarLogo({ img = '', imgAlt = '', children }) {
  return (
    <FlowbiteSidebar.Logo img={img} imgAlt={imgAlt}>
      {children}
    </FlowbiteSidebar.Logo>
  )
}

// -----------------------------------------------
export function SidebarTriggerClose() {
  return (
    <div className='relative sm:hidden'>
      <button
        type='button'
        aria-controls='sidebar'
        data-drawer-hide='sidebar'
        data-drawer-target='sidebar'
        className={twJoin(
          'absolute -top-1 right-0',
          'inline-flex items-center',
          'rounded-lg p-1.5 text-sm',
          'bg-transparent text-gray-400',
          'hover:bg-gray-200 hover:text-gray-900',
          'dark:hover:bg-gray-600 dark:hover:text-white'
        )}>
        <X />
      </button>
    </div>
  )
}

// -----------------------------------------------
export function SidebarTriggerOpen() {
  return (
    <div>
      <button
        type='button'
        aria-controls='sidebar'
        data-drawer-show='sidebar'
        data-drawer-target='sidebar'
        className={twJoin(
          'mx-2 p-2',
          'inline-flex items-center md:hidden',
          'rounded-lg text-sm focus:outline-none focus:ring-2',
          'text-gray-500 hover:bg-gray-100 focus:ring-gray-200 ',
          'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        )}>
        <Menu />
      </button>
    </div>
  )
}

// -----------------------------------------------
export function SidebarMenu({ items }) {
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
              active={route().current(item.route)}>
              {item.title}
            </FlowbiteSidebar.Item>
          ))}
        </FlowbiteSidebar.ItemGroup>
      ))}
    </FlowbiteSidebar.Items>
  )
}
