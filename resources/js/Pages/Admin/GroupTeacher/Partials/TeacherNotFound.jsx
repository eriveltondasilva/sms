import NotFound from '@/Components/NotFound'
import { XCircle } from 'lucide-react'

export default function TeacherNotFound() {
  return (
    <NotFound>
      <XCircle />
      Nenhum professor encontrado na turma...
    </NotFound>
  )
}
