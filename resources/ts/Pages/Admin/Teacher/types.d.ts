import type { PageProps, Teacher, PaginatedData } from '@/Types'

export type TeacherCreateProps = PageProps

export type TeacherEditProps = {
  teacher: Teacher
}

export type TeacherIndexProps = {
  teacherPagination: PaginatedData<Teacher>
}

export type TeacherShowProps = PageProps<{
  teacher: Teacher
}>

//

export type FormDataProps = {
  data?: Teacher
  errors?: any
  readOnly?: boolean
}

export type TeacherTableProps = {
  teachers: Teacher[]
}

export type TeacherPaginationProps = {
  pagination: PaginatedData<Teacher>
}
