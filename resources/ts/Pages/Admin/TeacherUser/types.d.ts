import type { PageProps, Teacher, User } from '@/Types'

export type TeacherUserEditProps = PageProps<{
  teacher: Teacher
  user: User
}>

export type TeacherUserCreateProps = {
  teacher: Teacher
}

export type FormDataProps = {
  data?: User
  errors?: any
}
