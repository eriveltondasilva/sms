import type { PageProps, Subject, Teacher } from '@/Types'

export type SubjectTeacherProps = PageProps<{
  subject: Subject
  teachers: Teacher[]
}>

export type TableTeacherProps = {
  subject: Subject
  teachers: Teacher[]
  disabled: boolean
  onClick: (params: Record<string, any>) => void
}
