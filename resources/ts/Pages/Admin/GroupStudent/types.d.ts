import type { Group, PageProps, PaginatedData, Student } from '@/Types'

export type GroupStudentCreateProps = PageProps<{
  group: Group
  studentPagination: PaginatedData<Student>
}>

export type GroupStudentIndexProps = PageProps<{
  group: Group
  students: Student[]
}>

//

export type GroupStudentTableProps = {
  group: Group
  students: Student[]
  disabled: boolean
  onClick: (params: Record<string, any>) => void
}

export type GroupStudentPaginationProps = {
  pagination: PaginatedData<any>
}
