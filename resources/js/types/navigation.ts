import type { InertiaLinkProps } from '@inertiajs/react'
import type { LucideIcon } from 'lucide-react'
import type { App } from '@/wayfinder/types'

export type BreadcrumbItem = {
    title: string
    href: string
}

export type NavItem = {
    title: string
    href: NonNullable<InertiaLinkProps['href']>
    icon?: LucideIcon | null
    isActive?: boolean
    permission?: App.Enums.UserPermission
}

export type NavGroup = {
    label: string | null
    items: NavItem[]
}
