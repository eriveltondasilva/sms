import type { Group, PageProps, Teacher } from '@/Types'

export type GroupTeacherCreateProps = PageProps<{
  group: Group
  teachers: Teacher[]
}>

export type GroupTeacherIndexProps = PageProps<{
  group: Group
  teachers: Teacher[]
}>

//

export type TeacherTableProps = {
  group: Group
  teachers: Teacher[]
  disabled: boolean
  onClick: (params: Record<string, any>) => void
}
