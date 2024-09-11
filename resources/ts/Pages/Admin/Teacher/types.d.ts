import type { PageProps, PaginatedData, Teacher } from '@/Types'

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
