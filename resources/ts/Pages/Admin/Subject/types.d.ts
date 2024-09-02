import type { PageProps, Subject } from '@/Types'

type SubjectWithCount = {
  teachers_count: number
} & Subject

export type SubjectIndexProps = PageProps<{
  subjects: SubjectWithCount[]
}>

//

export type CardSubjectProps = {
  subjects: SubjectWithCount[]
}
