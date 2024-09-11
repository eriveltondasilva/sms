import type { Group, SchoolYear } from '@/Types'

export type GroupIndexProps = {
  activeYear: SchoolYear
  teacherGroups: Group[]
  selectedGroup: Group
}
// FIXME: fix GroupIndexProps
