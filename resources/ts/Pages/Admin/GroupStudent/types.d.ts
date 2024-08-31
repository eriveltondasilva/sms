import type { Group, PageProps, Student, StudentPagination } from '@/Types'

export type GroupStudentIndexProps = PageProps<{
  group: Group
  students: Student[]
}>

export type GroupStudentTableProps = {
  group: Group
  students: Student[]
  disabled: boolean
  onClick: (params: Record<string, any>) => void
}

export type GroupStudentCreateProps = PageProps<{
  group: Group
  studentPagination: StudentPagination
}>

export type GroupStudentPaginationProps = {
  pagination: StudentPagination
}
