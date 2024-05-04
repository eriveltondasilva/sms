import NotFound from '@/Components/NotFound'
import { XCircle } from 'lucide-react'

export default function StudentNotFound() {
  return (
    <NotFound>
      <XCircle />
      Nenhum aluno encontrado na turma...
    </NotFound>
  )
}
