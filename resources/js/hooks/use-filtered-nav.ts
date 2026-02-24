import { usePage } from '@inertiajs/react'

import { NAV_GROUPS } from '@/constants/nav-groups'
import { UserRole } from '@/wayfinder/App/Enums/UserRole'

import type { NavGroup } from '@/types'

export function useFilteredNav() {
  const { auth } = usePage().props

  if (auth.role === UserRole.SUPER_ADMIN) {
    return NAV_GROUPS
  }

  return NAV_GROUPS.reduce<NavGroup[]>((groups, group) => {
    const items = group.items.filter((item) => {
      if (!item.permission) return true
      return auth.can[item.permission] === true
    })

    if (items.length === 0) return groups

    return [...groups, { ...group, items }]
  }, [])
}
