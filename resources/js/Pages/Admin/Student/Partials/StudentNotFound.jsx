import { NotFound } from '@/Components/NotFound'

export default function StudentNotFound({ totalStudents }) {
  if (totalStudents > 0) return null

  return <NotFound icon>Nenhum aluno encontrado...</NotFound>
}
