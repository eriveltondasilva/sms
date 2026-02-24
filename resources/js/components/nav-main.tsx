import { Link } from '@inertiajs/react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { useFilteredNav } from '@/hooks/use-filtered-nav'

import { Icon } from './icon'

export function NavMain() {
  const { isCurrentUrl } = useCurrentUrl()
  const navGroups = useFilteredNav()

  return navGroups.map(({ label, items }, index) => (
    <SidebarGroup key={`sidebar-group-${label ?? index}`} className='px-2 py-0'>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map(({ icon, href, title }) => (
          <SidebarMenuItem key={`sidebar-menu-item-${title}`}>
            <SidebarMenuButton
              asChild
              isActive={isCurrentUrl(href)}
              tooltip={{ children: title }}
            >
              <Link href={href} prefetch>
                {icon && <Icon iconNode={icon} />}
                <span>{title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ))
}
