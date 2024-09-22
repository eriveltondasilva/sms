import type { PaginatedData, Teacher } from '@/Types'

export type FormDataProps = Partial<{
  data: Teacher
  errors: any
  readOnly: boolean
}>

export type TeacherTableProps = {
  teachers: Teacher[]
}

export type TeacherPaginationProps = {
  pagination: PaginatedData<Teacher>
}
