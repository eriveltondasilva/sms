import type { PageProps, Teacher, TeacherPagination } from '@/Types'

export type TeacherShowProps = PageProps<{
  teacher: Teacher
}>

export type TeacherIndexProps = {
  teacherPagination: TeacherPagination
}

export type TeacherEditProps = {
  teacher: Teacher
}

export type TeacherCreate = PageProps

export type FormDataProps = {
  data?: Teacher
  errors?: any
  readOnly?: boolean
}

export type TeacherTableProps = {
  teachers: Teacher[]
}

export type TeacherPaginationProps = {
  pagination: TeacherPagination
}
