import type { PageProps, Student, StudentPagination } from '@/Types'

export type StudentShowProps = PageProps<{
  student: Student
}>

export type StudentIndexProps = {
  studentPagination: StudentPagination
}

export type StudentEditProps = {
  student: Student
}

export type StudentCreateProps = PageProps

export type StudentTableProps = {
  students: Student[]
}

export type StudentPaginationProps = {
  pagination: StudentPagination
}

export type StudentFormDataProps = {
  data?: Student
  errors?: any
  readOnly?: boolean
}
