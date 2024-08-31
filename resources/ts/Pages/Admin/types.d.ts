import type { PageProps, SchoolYear } from '@/Types'

export type DashboardProps = PageProps<{
  studentsCount: number
  teachersCount: number
  groupsCount: number
  activeYear: SchoolYear
}>
