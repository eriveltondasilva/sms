import type { BreadcrumbItem } from './navigation'
import type { PropsWithChildren } from 'react'

export interface AppLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[]
}

export interface AuthLayoutProps extends PropsWithChildren {
    title?: string
    description?: string
}
