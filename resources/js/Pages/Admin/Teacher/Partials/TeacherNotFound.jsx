import { NotFound } from '@/Components/NotFound'

export default function TeacherNotFound({ totalTeachers }) {
  if (totalTeachers > 0) return null

  return <NotFound icon>Nenhum professor encontrado...</NotFound>
}
