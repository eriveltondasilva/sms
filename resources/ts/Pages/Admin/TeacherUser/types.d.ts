import type { PageProps, Teacher, User } from '@/Types'

export type TeacherUserCreateProps = {
  teacher: Teacher
}

export type TeacherUserEditProps = PageProps<{
  teacher: Teacher
  user: User
}>

//

export type FormDataProps = {
  data?: User
  errors?: any
}
