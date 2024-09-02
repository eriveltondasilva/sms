import type { PageProps, PaginatedData, Student } from '@/Types'

export type StudentCreateProps = PageProps

export type StudentEditProps = {
  student: Student
}

export type StudentIndexProps = {
  studentPagination: PaginatedData<Student>
}

export type StudentShowProps = PageProps<{
  student: Student
}>

//

export type StudentTableProps = {
  students: Student[]
}

export type StudentPaginationProps = {
  pagination: PaginatedData<Student>
}

export type StudentFormDataProps = {
  data?: Student
  errors?: any
  readOnly?: boolean
}
