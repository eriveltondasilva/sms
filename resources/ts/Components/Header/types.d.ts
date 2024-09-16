import type { User } from '@/Types'

export type HeaderRootProps = {
  children: React.ReactNode
}

export type HeaderRightProps = {
  activeYear: number
  children: React.ReactNode
}

export type HeaderLeftProps = {
  onCollapseSidebar: () => void
  onOpenSidebar: () => void
  username?: string
}

export type HeaderDropdownProps = {
  user: User
}
